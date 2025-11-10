import { UserService as UserServiceProto, CreateAccountRequest, CreateAccountResponse } from "@ralvarezdev/proto-user-ts";

const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL_MOVIE ?? "http://localhost:8080";

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

const movieClient = _createClientFn(UserServiceProto as any, transport);

export class MovieService {
  private static _instance: MovieService | null = null;
  private readonly client = movieClient;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {}

  public static get instance(): MovieService {
    MovieService._instance ??= new MovieService();
    return MovieService._instance;
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

export const movieService = MovieService.instance;
export default movieService;
