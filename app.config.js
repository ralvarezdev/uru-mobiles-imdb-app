import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    API_BASE_URL_AUTH: process.env.API_BASE_URL_AUTH,
  },
});
