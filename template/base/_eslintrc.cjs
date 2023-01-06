module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    process: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'no-console': 1,
    'no-useless-escape': 0,
    'no-empty': 0,
    'vue/multi-word-component-names': 0
  }
}
