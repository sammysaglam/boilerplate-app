import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";

const { compilerOptions } = require("./tsconfig");

const config: Config.InitialOptions = {
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
    "\\.svg$": "<rootDir>/tests-config/stub-svg.js",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  modulePathIgnorePatterns: ["src/e2e"],
  verbose: true,
  setupFiles: ["./jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/tests-config/setup.ts"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

// we can eslint disable next line becase we need to default export this jest config
// eslint-disable-next-line import/no-default-export
export default config;
