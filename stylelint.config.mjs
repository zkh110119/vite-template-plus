/** @type {import("stylelint").Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        'unit-allowed-list': ['em', 'rem', 's'],
      },
    },
  ],
}
