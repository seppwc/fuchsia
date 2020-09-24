module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./packages/core', './packages/common', './packages/orm'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtension: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
