import { AuthService as AuthServiceProto, ChangeEmailRequest, ChangeEmailResponse, ChangePasswordRequest, ChangePasswordResponse, ListUserRolesRequest, ListUserRolesResponse, LogInRequest, LogInResponse, LogOutRequest, LogOutResponse, RefreshTokenRequest, RefreshTokenResponse } from "@ralvarezdev/proto-auth-ts";
import * as Connect from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import Constants from "expo-constants";
const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL_AUTH ?? "http://localhost:8080";

// Custom fetch to capture response headers
let capturedHeaders: Headers | null = null as Headers | null;

// Base fetch that captures headers and includes refresh token when needed
const baseFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  // Add X-Refresh-Token header if refreshTokenValue is set (for refreshToken calls)
  const headers = new Headers(init?.headers);
  if (refreshTokenValue) {
    headers.set('X-Refresh-Token', refreshTokenValue);
  }
  
  const response = await fetch(input, {
    ...init,
    headers,
    credentials: 'include', // Important for cookies
  });
  
  // Store headers for later access - clone headers to avoid issues
  capturedHeaders = new Headers(response.headers);
  return response;
};

// Special variable to store refresh token for refreshToken requests
let refreshTokenValue: string | null = null;

// Create authenticated fetch wrapper with lazy initialization
let authenticatedFetchPromise: Promise<typeof fetch> | null = null;

function getAuthenticatedFetch(): typeof fetch {
  if (!authenticatedFetchPromise) {
    authenticatedFetchPromise = (async () => {
      const tokenHelper = await import("@/services/tokenHelper");
      const authServiceInstance = AuthService.instance;
      return tokenHelper.createAuthenticatedFetch(
        baseFetch,
        () => authServiceInstance.getAccessToken(),
        () => authServiceInstance.refreshAccessToken()
      );
    })();
  }
  
  // Return a fetch that waits for initialization
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const fetchFn = await authenticatedFetchPromise!;
    return fetchFn(input, init);
  };
}

export const transport = createConnectTransport({
  baseUrl: BASE_URL,
  fetch: getAuthenticatedFetch(),
});

const _createClientFn =
  (Connect as any).createClient ??
  (Connect as any).createPromiseClient ??
  null;

if (!_createClientFn) {
  throw new Error(
    "[@connectrpc/connect] no exporta createClient ni createPromiseClient. Revisa la versión instalada."
  );
}

const authClient = _createClientFn(AuthServiceProto as any, transport);

export class AuthService {
  private static _instance: AuthService | null = null;
  private readonly client = authClient;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {}

  public static get instance(): AuthService {
    AuthService._instance ??= new AuthService();
    return AuthService._instance;
  }

  public setTokens(accessToken: string | null, refreshToken?: string | null) {
    this.accessToken = accessToken;
    if (refreshToken !== undefined) this.refreshToken = refreshToken;
    // Sync tokens with other services
    this.syncTokensWithOtherServices();
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public clearTokens(): void {
    // Clear tokens atomically to prevent race conditions
    // Store old values to check if sync is needed
    const hadTokens = !!(this.accessToken || this.refreshToken);
    
    this.accessToken = null;
    this.refreshToken = null;
    // Clear refreshTokenValue used for refresh requests
    refreshTokenValue = null;
    
    // Only sync if tokens were actually set (avoid unnecessary syncs)
    // Use setTimeout to defer sync and prevent race conditions with concurrent requests
    if (hadTokens) {
      // Defer sync to next tick to avoid interfering with requests in flight
      setTimeout(() => {
        this.syncTokensWithOtherServices();
      }, 0);
    }
  }

  private syncTokensWithOtherServices() {
    // Import here to avoid circular dependencies - use dynamic import
    // Use setTimeout to defer the sync and avoid blocking
    setTimeout(async () => {
      try {
        const { default: userService } = await import("@/services/userService");
        const { default: movieService } = await import("@/services/movieService");
        userService.setTokens(this.accessToken, this.refreshToken);
        movieService.setTokens(this.accessToken, this.refreshToken);
      } catch (error) {
        console.warn("Could not sync tokens with other services:", error);
      }
    }, 0);
  }

  public async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      console.warn('No refresh token available');
      return false;
    }

    try {
      // Reset captured headers before making the request
      capturedHeaders = null;
      
      // Set refresh token value for the fetch wrapper to include in headers
      refreshTokenValue = this.refreshToken;

      const refreshRequest: RefreshTokenRequest = {
        $typeName: "ralvarezdev.v1.RefreshTokenRequest",
      };

      // Use the client's refreshToken method (similar to getMyRoles)
      const res = await this.client.refreshToken(refreshRequest);
      console.log('refresh token response', res);
      
      // Clear refresh token value after use
      refreshTokenValue = null;

      // Extract new tokens from captured response headers
      let accessToken: string | null = null;
      let refreshToken: string | null = null;

      if (capturedHeaders) {
        const xAccessToken = (capturedHeaders as Headers).get('X-Access-Token');
        const xRefreshToken = (capturedHeaders as Headers).get('X-Refresh-Token');

        if (xAccessToken) {
          accessToken = xAccessToken;
        }
        if (xRefreshToken) {
          refreshToken = xRefreshToken;
        }

        // Also check Set-Cookie headers
        if (!accessToken || !refreshToken) {
          const setCookieHeader = (capturedHeaders as Headers).get('Set-Cookie');
          if (setCookieHeader) {
            const cookies = setCookieHeader.split(',').map((c: string) => c.trim());
            for (const cookie of cookies) {
              const accessTokenMatch = cookie.match(/X-Access-Token=([^;]+)/);
              const refreshTokenMatch = cookie.match(/X-Refresh-Token=([^;]+)/);
              if (accessTokenMatch && !accessToken) {
                accessToken = decodeURIComponent(accessTokenMatch[1]);
              }
              if (refreshTokenMatch && !refreshToken) {
                refreshToken = decodeURIComponent(refreshTokenMatch[1]);
              }
            }
          }
        }
      }

      if (accessToken || refreshToken) {
        this.setTokens(accessToken, refreshToken);
        return true;
      }

      return false;
    } catch (err: any) {
      console.error('Error refreshing token:', err);
      // If refresh fails, clear tokens
      this.setTokens(null, null);
      return false;
    }
  }

//   private getAuthMeta() {
//     const headers: Record<string, string> = {};
//     if (this.accessToken) headers["authorization"] = `Bearer ${this.accessToken}`;
//     return { headers };
//   }

  public async logIn(input: LogInRequest): Promise<LogInResponse> {
    try {
      // Reset captured headers before making the request
      capturedHeaders = null;
      
      // Make the request using Connect RPC client
      const res = await this.client.logIn(input);
      console.log('res login', res);

      // Extract tokens from captured response headers
      let accessToken: string | null = null;
      let refreshToken: string | null = null;

      if (capturedHeaders) {
        // Check for custom headers (X-Access-Token, X-Refresh-Token)
        const xAccessToken = (capturedHeaders as Headers).get('X-Access-Token');
        const xRefreshToken = (capturedHeaders as Headers).get('X-Refresh-Token');

        if (xAccessToken) {
          accessToken = xAccessToken;
        }
        if (xRefreshToken) {
          refreshToken = xRefreshToken;
        }

        // Also check Set-Cookie headers if custom headers are not available
        if (!accessToken || !refreshToken) {
          const setCookieHeader = (capturedHeaders as Headers).get('Set-Cookie');
          if (setCookieHeader) {
            // Parse Set-Cookie header: "X-Access-Token=value; Path=/; HttpOnly, X-Refresh-Token=value; Path=/; HttpOnly"
            const cookies = setCookieHeader.split(',').map((c: string) => c.trim());
            
            for (const cookie of cookies) {
              const accessTokenMatch = cookie.match(/X-Access-Token=([^;]+)/);
              const refreshTokenMatch = cookie.match(/X-Refresh-Token=([^;]+)/);
              
              if (accessTokenMatch && !accessToken) {
                accessToken = decodeURIComponent(accessTokenMatch[1]);
              }
              if (refreshTokenMatch && !refreshToken) {
                refreshToken = decodeURIComponent(refreshTokenMatch[1]);
              }
            }
          }
        }

        console.log('tokens from headers - accessToken:', accessToken ? 'present' : 'missing', 'refreshToken:', refreshToken ? 'present' : 'missing');
      }

      // Store tokens if found in headers
      if (accessToken || refreshToken) {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        this.setTokens(accessToken, refreshToken);
      }

      return res as LogInResponse;
    } catch (err: any) {
      console.error('err', err);
      throw new Error(err?.message ?? "Error al iniciar sesión");
    }
  }

  public async getMyRoles(input: ListUserRolesRequest): Promise<ListUserRolesResponse> {
    try {
      const userRoles = await this.client.listUserRoles(input);
      console.log('user roles', userRoles);
      // if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
      return userRoles as ListUserRolesResponse;
    } catch (err: any) {
      console.error('err',err);
      throw new Error(err?.message ?? "Error al obtener los roles del usuario");
    }
  }

  public async changeEmail(newEmail: ChangeEmailRequest): Promise<ChangeEmailResponse> {
    try {
      const response = await this.client.changeEmail(newEmail);
      console.log("change email response", response);
      return response as ChangeEmailResponse;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al cambiar el email");
    }
  }

  public async changePassword(newPassword: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      const response = await this.client.changePassword(newPassword);
      console.log("change password response", response);
      return response as ChangePasswordResponse;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al cambiar la contraseña");
    }
  }

  public async requestCriticRole(): Promise<any> {
    try {
      // TODO: Replace with actual proto types when available
      // Expected types: RequestCriticRoleRequest, RequestCriticRoleResponse
      // The method name might be: requestCriticRole, requestRole, or similar
      const request = {
        $typeName: "ralvarezdev.v1.RequestCriticRoleRequest",
      };
      
      // Try to call the method - adjust method name based on actual proto definition
      const response = await this.client.requestCriticRole?.(request) 
        ?? await this.client.requestRole?.(request);
      
      console.log("request critic role response", response);
      return response;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al solicitar ser crítico");
    }
  }

  public async logOut(input: LogOutRequest): Promise<LogOutResponse> {
    try {
      const response = await this.client.logOut(input);
      console.log("log out response", response);
      
      // Only clear tokens if logout was successful
      // Use setTimeout to defer token clearing slightly to ensure:
      // 1. The logout request has fully completed (including any response processing)
      // 2. Any concurrent requests that started before logout can complete
      // 3. We don't interfere with the logout request itself which may need the token
      if (response.$typeName === "ralvarezdev.v1.LogOutResponse") {
        // Defer token clearing to avoid race conditions with concurrent requests
        // Small delay ensures logout request and any immediate follow-up requests complete
        setTimeout(() => {
          this.clearTokens();
        }, 50);
      }
      
      return response as LogOutResponse;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al cerrar sesión");
    }
  }

//   public async register(input: RegisterRequest): Promise<RegisterResponse> {
//     try {
//       const res = await (this.client as any).register(input);
//       if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
//       return res as RegisterResponse;
//     } catch (err: any) {
//       throw new Error(err?.message ?? "Error al registrar");
//     }
//   }

  public static closeTransport(): void {
    try {
      const t: any = transport;
      if (typeof t.close === "function") t.close();
    } catch(error) {
      console.error(error);
    }
  }
}

export const authService = AuthService.instance;
export default authService;
