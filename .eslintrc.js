module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/require-await': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
  },
};
