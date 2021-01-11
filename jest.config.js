/* eslint-disable no-undef */
module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
    '<rootDir>/.vscode/',
    '<rootDir>/public/',
    '<rootDir>/src/client',
    '<rootDir>/src/config',
    '<rootDir>/src/style',
  ],
  roots: ['src/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/client/',
    '<rootDir>/src/config/',
    '<rootDir>/src/style/',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  // preset: 'jest-puppeteer',
};
