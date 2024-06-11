import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

module.exports = ({ config }) => {
  config.resolve = {
    ...config.resolve,
    plugins: [...(config.resolve.plugins || []), new TsconfigPathsPlugin()],
  };

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 8192,
      },
    }),
  );

  // disable whatever is already set to load SVGs
  config.module.rules
    .filter((rule) => rule.test?.test?.(".svg"))
    .forEach((rule) => (rule.exclude = /\.svg$/i));

  // add in svg loader
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
  });

  return config;
};
