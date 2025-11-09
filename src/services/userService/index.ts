import { UserService as UserServiceProto, CreateAccountRequest, CreateAccountResponse } from "@ralvarezdev/proto-user-ts";

const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL_USER ?? "http://localhost:8080";

export const transport = createConnectTransport({
  baseUrl: BASE_URL,
});

import * as Connect from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import Constants from "expo-constants";

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

  public async register(input: CreateAccountRequest): Promise<CreateAccountResponse> {
    try {
      console.log("input", BASE_URL);
      const res = await this.client.createAccount(input);
      console.log("res login", res);
      // if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
      return res as CreateAccountResponse;
    } catch (err: any) {
      console.error("err", err);
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
    } catch (error) {
      console.error(error);
    }
  }
}

export const userService = UserService.instance;
export default userService;
