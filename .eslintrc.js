module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'import', '@typescript-eslint', 'immer'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    camelcase: 'off',
    'no-use-before-define': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-param-reassign': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
