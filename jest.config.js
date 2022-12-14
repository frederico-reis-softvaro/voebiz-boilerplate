module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!**/**/*.d.ts"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/app/main.ts",
    ".mock.ts",
    "<rootDir>/src/config/*",
    "<rootDir>/src/index.tsx",
    "<rootDir>/src/App.tsx",
    "<rootDir>/src/test/*",
  ],
  testPathIgnorePatterns: ["node_modules", "<rootDir>/src/index.tsx"],
  coverageDirectory: "coverage",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
    "@/(.*)": "<rootDir>/src/$1",
    "src/(.*)": "<rootDir>/src/$1",
    "src/assets/(.*)": "<rootDir>/src/assets/$1",
  },

  modulePaths: ["<rootDir>/src/", "<rootDir>/.jest"],
  setupFilesAfterEnv: ["./config/jest/setupTests.ts"],
  testResultsProcessor: "jest-sonar-reporter",
};
