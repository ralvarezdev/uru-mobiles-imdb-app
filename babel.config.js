module.exports = function exports(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // o "module:metro-react-native-babel-preset"
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: { "@": "./src" },
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      ],
    ],
  };
};
