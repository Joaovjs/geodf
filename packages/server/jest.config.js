const { name } = require('./package.json') // eslint-disable-line

module.exports = {
  displayName: name,
  name,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/modules/**/services/*.ts',
    './src/modules/**/services/**/*.ts',
    './src/modules/**/services/**/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov']
}
