# uru-mobiles-imdb-app

IMDB-style mobile app ("critics") built with Expo / React Native, for the Mobile Development college course. Users browse movies (cast, crew, synopsis, ratings), register/log in, manage their profile, and write/edit reviews. It talks to the `auth`, `user` and `movies` gRPC-Web microservices from the companion `uru-mobiles-imdb-api` deployment, via Connect-RPC.

## Tech stack

- **Expo SDK 54** / **React Native 0.81** / **React 19**, routed with **expo-router** (file-based routing, typed routes)
- **Connect-RPC** (`@connectrpc/connect`, `@connectrpc/connect-web`) with generated protobuf clients: `@ralvarezdev/proto-auth-ts`, `@ralvarezdev/proto-user-ts`, `@ralvarezdev/proto-movies-ts`
- **React Navigation** for tab navigation
- **TypeScript** 5.9
- Runs on iOS, Android and web

## Project structure

```
src/
  app/                       # expo-router routes: (tabs)/home, (tabs)/profile, movie detail, register
  components/                # atoms, molecules, organisms, screens, templates
  services/                  # authService, userService, movieService (Connect-RPC clients)
  entities/User.ts
  theme/, utils/
app.config.js                # injects API_BASE_URL_AUTH / API_BASE_URL_USER / API_BASE_URL_MOVIE
```

## Configuration

Three base URLs are read from environment variables at build/config time (via `dotenv` in `app.config.js`, exposed through `expo-constants`): `API_BASE_URL_AUTH`, `API_BASE_URL_USER`, `API_BASE_URL_MOVIE`. Point these at the `auth`, `user` and `movies` services of a running `uru-mobiles-imdb-api` deployment.

## Running

```bash
npm install
npm run start      # expo start
npm run ios
npm run android
npm run web
```

## Notes

No `LICENSE` file is present in this repository.

## Related repositories

- [`uru-mobiles-imdb-api`](https://github.com/ralvarezdev/uru-mobiles-imdb-api) — matching API.
