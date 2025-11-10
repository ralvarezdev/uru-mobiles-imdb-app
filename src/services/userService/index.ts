import { UserService as UserServiceProto, CreateAccountRequest, CreateAccountResponse, GetMyProfileRequest, GetMyProfileResponse, UpdateProfileRequest, UpdateProfileResponse, DeleteAccountResponse, DeleteAccountRequest } from "@ralvarezdev/proto-user-ts";

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

  public async register(orops: CreateAccountRequest): Promise<CreateAccountResponse> {
    try {
      const res = await this.client.createAccount(orops);
      console.log("register", res);
      // if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
      return res as CreateAccountResponse;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al registrar usuario");
    }
  }

  public async me(orops: GetMyProfileRequest): Promise<GetMyProfileResponse> {
    try {
      const user = await this.client.getMyProfile(orops);
      console.log("user profile", user);
      // if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
      return user as GetMyProfileResponse;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al obtener el perfil del usuario");
    }
  }

  public async update(orops: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    try {
      const result = await this.client.updateProfile(orops);
      console.log("update user profile", result);
      // if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
      return result as UpdateProfileResponse;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al actualizar el usuario");
    }
  }

  public async delete(orops: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    try {
      const result = await this.client.deleteAccount(orops);
      console.log("update user profile", result);
      // if (res?.accessToken) this.setTokens(res.accessToken, res.refreshToken ?? null);
      return result as DeleteAccountResponse;
    } catch (err: any) {
      console.error("err", err);
      throw new Error(err?.message ?? "Error al eliminar el usuario");
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
