module.exports = {
  verbose: false,
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  testMatch: ["<rootDir>/src/test/**/*.test.ts"],
  notifyMode: "change",
  reporters: ["jest-dot-reporter"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1"
  }
};
