import "dotenv/config";

const app = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    API_BASE_URL_AUTH: process.env.API_BASE_URL_AUTH,
    API_BASE_URL_USER: process.env.API_BASE_URL_USER,
    API_BASE_URL_MOVIE: process.env.API_BASE_URL_MOVIE,
  },
});
export default app;
