// @ts-check
const github = require('eslint-plugin-github')
const tseslint = require('typescript-eslint')
const jest = require('eslint-plugin-jest')

module.exports = tseslint.config(
  {ignores: ['dist/', 'lib/', 'node_modules/', 'jest.config.js']},
  github.getFlatConfigs().recommended,
  ...tseslint.configs.recommended,
  jest.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {allowAny: true}
      ],
      camelcase: 'off',
      'i18n-text/no-en': 'off',
      'import/no-namespace': 'off',
      'import/no-unresolved': 'off'
    }
  }
)
