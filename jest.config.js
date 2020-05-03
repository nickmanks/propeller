module.exports = {
  setupFiles: ['<rootDir>/.testing/setup.js'],
  testRegex: './*.(stories|test).js$',
  globals: {
    __TESTS__: true
  },

  setupFilesAfterEnv: ['<rootDir>/.testing/setup-env.js'],

  moduleNameMapper: {
    '#src(.*)$': '<rootDir>/src/$1',
    '^.*.scss$': '<rootDir>/.testing/mock-style.js',
    '^.*.css$': '<rootDir>/.testing/mock-style.js'
  },

  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/.cache/'
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.*.(png|gif|svg|jpg|jpeg)$': '<rootDir>/.testing/mock-file.js'
  },

  transformIgnorePatterns: [],

  timers: 'fake',
  clearMocks: true,
  resetMocks: false,
  automock: false,

  collectCoverage: true,
  coverageDirectory: '.cov',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.(js|jsx)',
    '!src/testing/*.(js|jsx)',
    '!src/store.js'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
