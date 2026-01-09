/**
 * @filename: lint-staged.config.js
 */
export default {
  '*': 'prettier --write --ignore-unknown',
  '*.{css,scss,vue}': 'stylelint --fix',
  '*.{js,mjs,ts,vue}': 'eslint --fix',
}
