module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.tsx',
        './src/**/*.ts',
        './src/**/*.jsx',
        './src/**/*.js',
        './public/**/*.html'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [
        // Keep critical rack UI classes
        /^rack-/,
        /^module-/,
        /^led/,
        /^neon-/,
        /^glass-/,
        /^knob-/,
        /^cafe-/,
        // Keep animation classes
        /^skeleton/,
        /^pulse-/,
        /^flicker/,
        // Keep data attributes
        /data-channel/,
        // Keep state classes
        /active/,
        /hover/,
        /focus/
      ]
    }),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifyGradients: true
      }]
    })
  ]
}
