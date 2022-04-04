module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsConfigRootDir: '.',
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    mongo: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
  ],
  rules: {
    'max-len': 'off',
    'object-curly-newline': 'off',
    'newline-per-chained-call': 'off',
    'no-underscore-dangle': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
