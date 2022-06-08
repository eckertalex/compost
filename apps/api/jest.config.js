module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/__mocks__/prisma-mock.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/test/__mocks__',
    '<rootDir>/test/generator.ts',
    '<rootDir>/node_modules',
    '<rootDir>/dist',
  ],
}
