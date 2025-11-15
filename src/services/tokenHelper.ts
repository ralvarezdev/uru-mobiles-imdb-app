import { ConnectError } from "@connectrpc/connect";

/**
 * Creates a fetch wrapper that:
 * 1. Adds Bearer token to Authorization header
 * 2. Automatically refreshes token on 401 errors
 * 3. Retries the original request after refresh
 */
export function createAuthenticatedFetch(
  baseFetch: typeof fetch = fetch,
  getTokenFn?: () => string | null,
  refreshTokenFn?: () => Promise<boolean>
): typeof fetch {
  let isRefreshing = false;
  let refreshPromise: Promise<boolean> | null = null;

  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    // Get current access token - use provided function or import dynamically
    // Capture token at the start of the request to avoid race conditions
    let accessToken: string | null = null;
    if (getTokenFn) {
      accessToken = getTokenFn();
    } else {
      // Dynamic import to avoid circular dependency
      const { default: authService } = await import("./authService");
      accessToken = authService.getAccessToken();
    }

    // Add Bearer token to headers if available
    // Only add if token exists to avoid sending "Bearer null"
    const headers = new Headers(init?.headers);
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    // Make the request with Bearer token
    let response = await baseFetch(input, {
      ...init,
      headers,
    });

    // If we get a 401, try to refresh the token and retry
    if (response.status === 401 && accessToken) {
      // Prevent multiple simultaneous refresh attempts
      if (!isRefreshing) {
        isRefreshing = true;
        if (refreshTokenFn) {
          refreshPromise = refreshTokenFn();
        } else {
          // Dynamic import to avoid circular dependency
          const { default: authService } = await import("./authService");
          refreshPromise = authService.refreshAccessToken();
        }
      }

      // Wait for refresh to complete
      const refreshSuccess = await refreshPromise;
      isRefreshing = false;
      refreshPromise = null;

      if (refreshSuccess) {
        // Get the new token
        let newAccessToken: string | null = null;
        if (getTokenFn) {
          newAccessToken = getTokenFn();
        } else {
          const { default: authService } = await import("./authService");
          newAccessToken = authService.getAccessToken();
        }
        
        // Update headers with new token
        const retryHeaders = new Headers(init?.headers);
        if (newAccessToken) {
          retryHeaders.set('Authorization', `Bearer ${newAccessToken}`);
        }

        // Retry the original request
        response = await baseFetch(input, {
          ...init,
          headers: retryHeaders,
        });
      }
    }

    return response;
  };
}

