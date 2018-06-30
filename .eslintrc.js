module.exports = {
  env: { node: true, jest: true },
  parser: 'typescript-eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['babel'],
  rules: {
    'no-use-before-define': 'off',
    indent: ['warn', 2],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    quotes: ['warn', 'single'],
    'object-shorthand': ['warn', 'always'],
    'no-alert': 'off',
    semi: ['warn', 'never'],
    'max-len': ['warn', 80],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 6 }],
  },
}
