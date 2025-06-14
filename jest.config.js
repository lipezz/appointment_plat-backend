const { createDefaultPreset } = require("ts-jest")

const tsJestTransformCfg = createDefaultPreset().transform

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], 
  moduleDirectories: ['node_modules', 'src'],
  clearMocks: true,
}