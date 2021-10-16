// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   roots: [
//     "<rootDir>/src"
//   ],
//   moduleDirectories: [
//     "node_modules",
//     "src"
//   ],
//   verbose: true,
// };

module.exports = {
  globals: {
      "ts-jest": {
          tsConfig: "tsconfig.json"
      }
  },
  moduleFileExtensions: [
      "ts",
      "js"
  ],
  transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
      "**/src/**/*.test.(ts|js)"
  ],
  testEnvironment: "node",
  verbose: true,
};