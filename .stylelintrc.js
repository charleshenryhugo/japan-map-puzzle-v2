module.exports = {
  defaultSeverity: "warning",
  extends: [
      "stylelint-config-recommended-scss",
      "stylelint-config-rational-order",
  ],
  plugins: [
      "stylelint-order",
      "stylelint-config-rational-order/plugin",
  ],
  rules: {
      "color-named": "never",
      "shorthand-property-no-redundant-values": true,
      "declaration-block-no-redundant-longhand-properties": true,
      "declaration-block-single-line-max-declarations": 1,
      "selector-max-compound-selectors": 3,
      "selector-max-empty-lines": 0,
      "selector-max-id": 0,
      "max-nesting-depth": 3,
      "color-hex-case": "lower",
      "color-hex-length": "long",
      "font-weight-notation": "numeric",
      "number-no-trailing-zeros": true,
      "string-quotes": "single",
      "length-zero-no-unit": true,
      "unit-case": "lower",
      "value-keyword-case": "lower",
      "property-case": "lower",
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "declaration-empty-line-before": "never",
      "declaration-block-semicolon-newline-after": "always",
      "declaration-block-semicolon-newline-before": "never-multi-line",
      "declaration-block-semicolon-space-before": "never",
      "declaration-block-trailing-semicolon": "always",
      "block-closing-brace-empty-line-before": "never",
      "block-closing-brace-newline-after": "always",
      "block-closing-brace-newline-before": "always",
      "block-opening-brace-newline-after": "always",
      "block-opening-brace-space-before": "always",
      "selector-attribute-brackets-space-inside": "never",
      "selector-list-comma-newline-after": "always",
      "selector-list-comma-space-before": "never",
      "selector-pseudo-element-no-unknown": [true, {
          "ignorePseudoElements": ["v-deep"]
      }],
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-parentheses-space-inside": "never",
      "indentation": 2,
      "no-eol-whitespace": true,
      "no-missing-end-of-source-newline": true,
      "no-empty-first-line": true,
      "order/properties-order": [],
      "plugin/rational-order": [true, {
          "border-in-box-model": false,
          "empty-line-between-groups": false,
      }],
  },
}
