import { UserService as UserServiceProto, CreateAccountRequest, CreateAccountResponse, GetMyProfileRequest, GetMyProfileResponse, UpdateProfileRequest, UpdateProfileResponse, DeleteAccountResponse, DeleteAccountRequest } from "@ralvarezdev/proto-user-ts";
import * as Connect from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import Constants from "expo-constants";
import { ConnectError } from "@connectrpc/connect";
import { parseConnectError, ParsedError } from "@/services/errorHelper";

const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL_USER ?? "http://localhost:8080";

// Import token helper to add Bearer token and auto-refresh
import { createAuthenticatedFetch } from "@/services/tokenHelper";

// Create authenticated fetch with authService functions
let authenticatedFetchPromise: Promise<typeof fetch> | null = null;

function getAuthenticatedFetch(): typeof fetch {
  if (!authenticatedFetchPromise) {
    authenticatedFetchPromise = (async () => {
      const authService = (await import("@/services/authService")).default;
      return createAuthenticatedFetch(
        fetch,
        () => authService.getAccessToken(),
        () => authService.refreshAccessToken()
      );
    })();
  }
  
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const fetchFn = await authenticatedFetchPromise!;
    return fetchFn(input, init);
  };
}

export const transport = createConnectTransport({
  baseUrl: BASE_URL,
  fetch: getAuthenticatedFetch(),
});

const _createClientFn = (Connect as any).createClient ?? (Connect as any).createPromiseClient ?? null;

if (!_createClientFn) {
  throw new Error("[@connectrpc/connect] no exporta createClient ni createPromiseClient. Revisa la versión instalada.");
}

const userClient = _createClientFn(UserServiceProto as any, transport);

export class UserService {
  private static _instance: UserService | null = null;
  private readonly client = userClient;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {}

  public static get instance(): UserService {
    UserService._instance ??= new UserService();
    return UserService._instance;
  }

  public setTokens(accessToken: string | null, refreshToken?: string | null) {
    this.accessToken = accessToken;
    if (refreshToken !== undefined) this.refreshToken = refreshToken;
  }

  //   private getAuthMeta() {
  //     const headers: Record<string, string> = {};
  //     if (this.accessToken) headers["authorization"] = `Bearer ${this.accessToken}`;
  //     return { headers };
  //   }

  public async register(orops: CreateAccountRequest): Promise<CreateAccountResponse | undefined> {
    try {
      const res = await this.client.createAccount(orops);
      console.log("register response:", res);
      console.log("register response type:", typeof res);
      console.log("register response $typeName:", res?.$typeName);
      
      // Clear any previous errors on success
      (this as any)._lastError = undefined;
      
      return res as CreateAccountResponse;
    } catch (err) {
      // console.error("register error:", err);
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed registration errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
      return undefined;
    }
  }

  public async me(orops: GetMyProfileRequest): Promise<GetMyProfileResponse | undefined> {
    try {
      const user = await this.client.getMyProfile(orops);
      console.log("user profile", user);
      return user as GetMyProfileResponse;
    } catch (err) {
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed profile errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
      return undefined;
    }
  }

  public async update(orops: UpdateProfileRequest): Promise<UpdateProfileResponse | undefined> {
    try {
      const result = await this.client.updateProfile(orops);
      console.log("update user profile", result);
      return result as UpdateProfileResponse;
    } catch (err) {
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed update errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
      return undefined;
    }
  }

  public async delete(orops: DeleteAccountRequest): Promise<DeleteAccountResponse | undefined> {
    try {
      // Clear any previous errors before making the request
      (this as any)._lastError = undefined;
      
      const result = await this.client.deleteAccount(orops);
      console.log("delete user account", result);
      
      // Clear any previous errors on success
      (this as any)._lastError = undefined;
      
      return result as DeleteAccountResponse;
    } catch (err) {
      // console.error("delete error:", err);
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed delete errors:", parsedError);
        // Store parsed error for components to access
        (this as any)._lastError = parsedError;
      }
      // Return undefined instead of throwing to avoid unhandled errors
      return undefined;
    }
  }

  /**
   * Gets the last parsed error from the most recent service call
   * Use this in components to access error details when a method returns undefined
   */
  public getLastError(): ParsedError | undefined {
    return (this as any)._lastError;
  }

  /**
   * Clears the last error
   */
  public clearLastError(): void {
    (this as any)._lastError = undefined;
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
    } catch (error) {
      console.error(error);
    }
  }
}

export const userService = UserService.instance;
export default userService;
