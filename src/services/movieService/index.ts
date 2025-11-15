import { MoviesService as MoviesServiceProto, SearchMoviesRequest, SearchMoviesResponse, GetMovieDetailsRequest, GetMovieDetailsResponse, AddMovieReviewRequest, AddMovieReviewResponse, GetMovieReviewsRequest, GetMovieReviewsResponse, GetTopRatedMoviesRequest, GetTopRatedMoviesResponse } from "@ralvarezdev/proto-movies-ts";

import * as Connect from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import Constants from "expo-constants";
import { ConnectError } from "@connectrpc/connect";
import { parseConnectError, ParsedError } from "@/services/errorHelper";

const BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL_MOVIE ?? "http://localhost:8080";

// Import token helper to add Bearer token and auto-refresh
import { createAuthenticatedFetch } from "@/services/tokenHelper";

// Create authenticated fetch with authService functions
let authenticatedFetchPromise: Promise<typeof fetch> | null = null;

function getAuthenticatedFetch(): typeof fetch {
  authenticatedFetchPromise ??= (async () => {
      const authService = (await import("@/services/authService")).default;
      return createAuthenticatedFetch(
        fetch,
        () => authService.getAccessToken(),
        () => authService.refreshAccessToken()
      );
    })();
  
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

const movieClient = _createClientFn(MoviesServiceProto as any, transport);

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

  public async search(props: SearchMoviesRequest): Promise<SearchMoviesResponse | undefined> {
    try {
      const moviesResponse = await this.client.searchMovies(props);
      // console.log("search movies response:", moviesResponse);
      
      // Clear any previous errors on success
      (this as any)._lastError = undefined;
      
      return moviesResponse as SearchMoviesResponse;
    } catch (err) {
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed search movies errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
      return undefined;
    }
  }

  public async getTopRatedMovies(props: GetTopRatedMoviesRequest): Promise<GetTopRatedMoviesResponse | undefined> {
    try {
      const moviesResponse = await this.client.getTopRatedMovies(props);
      // console.log("getTopRatedMovies response:", moviesResponse);
      
      // Clear any previous errors on success
      (this as any)._lastError = undefined;
      
      return moviesResponse as GetTopRatedMoviesResponse;
    } catch (err) {
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed getTopRatedMovies errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
      return undefined;
    }
  }

  public async getDetail(props: GetMovieDetailsRequest): Promise<GetMovieDetailsResponse | undefined> {
    try {
      console.log("getReviews props:", props);
      const movieDetailResponse = await this.client.getMovieDetails(props);
      // console.log("getDetail response:", movieDetailResponse);
      (this as any)._lastError = undefined;
      
      return movieDetailResponse as GetMovieDetailsResponse;
    } catch (err) {
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed getDetail errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
      return undefined;
    }
  }

  public async addReview(props: AddMovieReviewRequest): Promise<AddMovieReviewResponse | undefined> {
    try {
      const reviewResponse = await this.client.addMovieReview(props);
      console.log("addReview response:", reviewResponse);
      
      // Clear any previous errors on success
      (this as any)._lastError = undefined;
      
      return reviewResponse as AddMovieReviewResponse;
    } catch (err) {
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed addReview errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
      return undefined;
    }
  }

  public async getReviews(props: GetMovieReviewsRequest): Promise<GetMovieReviewsResponse | undefined> {
    try {
      const reviewsResponse = await this.client.getMovieReviews(props);
      console.log("getReviews response:", reviewsResponse);
      (this as any)._lastError = undefined;
      
      return reviewsResponse as GetMovieReviewsResponse;
    } catch (err) {
      if (err instanceof ConnectError) {
        const parsedError = parseConnectError(err);
        console.log("Parsed getReviews errors:", parsedError);
        (this as any)._lastError = parsedError;
      }
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
