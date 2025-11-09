import { AuthService as AuthServiceProto, LogInRequest, LogInResponse } from "@ralvarezdev/proto-auth-ts";

const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL_AUTH ?? "http://localhost:8080";

export const transport = createConnectTransport({
  baseUrl: BASE_URL,
});

import * as Connect from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import Constants from "expo-constants";

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
  }

//   private getAuthMeta() {
//     const headers: Record<string, string> = {};
//     if (this.accessToken) headers["authorization"] = `Bearer ${this.accessToken}`;
//     return { headers };
//   }

  public async logIn(input: LogInRequest): Promise<LogInResponse> {
    try {
      console.log('input', BASE_URL);
      const res = await this.client.logIn(input);
      console.log('res login', res);
      if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
      return res as LogInResponse;
    } catch (err: any) {
      console.error('err',err);
      throw new Error(err?.message ?? "Error al iniciar sesión");
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
