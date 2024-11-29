/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ['eslint-plugin-react-compiler'],
  extends: ['next/core-web-vitals'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
