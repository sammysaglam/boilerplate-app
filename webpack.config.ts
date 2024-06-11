import "./src/utils/loadEnvVars";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration as WebpackConfiguration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

import { booleanFilter } from "./src/utils/booleanFilter";

interface Configuration extends WebpackConfiguration {
  readonly devServer?: WebpackDevServerConfiguration;
}

const WEBPACKDEV_PORT = process.env.PORT ? Number(process.env.PORT) : 3456;

const config: (options: {
  readonly WEBPACK_SERVE: boolean;
  readonly analyze: boolean;
}) => Configuration = (options) => {
  const isProduction = !options.WEBPACK_SERVE || options.analyze;
  const isAnalyze = Boolean(options.analyze);

  return {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "eval-cheap-module-source-map",
    entry: "./src/entry.tsx",
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("swc-loader"),
              options: {
                jsc: {
                  transform: {
                    react: {
                      development: !isProduction,
                      refresh: !isProduction,
                    },
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|webp|jpg|jpeg|mp4)$/,
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      open: true,
      historyApiFallback: true,
      hot: true,
      static: [path.join(__dirname, "public")],
      compress: true,
      port: WEBPACKDEV_PORT,
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      client: {
        overlay: false,
      },
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin()],
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].js",
    },
    plugins: [
      isAnalyze && new BundleAnalyzerPlugin(),

      new CopyPlugin({
        patterns: [
          {
            from: "./public",
            to: ".",
          },
        ],
      }),

      new ForkTsCheckerWebpackPlugin({
        typescript: {
          memoryLimit: 8192,
        },
      }),

      !isProduction &&
        new ReactRefreshWebpackPlugin({
          overlay: false,
        }),

      new DefinePlugin({
        "process.env.UNSPLASH_ACCESS_KEY": JSON.stringify(
          process.env.UNSPLASH_ACCESS_KEY,
        ),
      }),
    ].filter(booleanFilter),
  };
};

// we can eslint disable next line becase we need to default export this webpack config
// eslint-disable-next-line import/no-default-export
export default config;
