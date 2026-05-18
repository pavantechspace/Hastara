/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'error',
  },
  ignorePatterns: ['node_modules/', 'dist/', '.next/', '.expo/', '*.js'],
  overrides: [
    {
      files: ['*.config.js', '*.config.ts', '.eslintrc.js'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
