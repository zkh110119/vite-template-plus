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
      files: ['*.vue', '**/*.vue', '*.scss', '**/*.scss'],
      rules: {
        'unit-allowed-list': ['px', 'em', 'rem', 's', 'ms'],
      },
    },
  ],
}
