module.exports = {
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-throw-expressions'
  ],

  presets: ['@babel/preset-react'],

  env: {
    ['webpack-dev']: {
      sourceMaps: 'both',
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: 'entry',
            corejs: 'core-js@3',
            targets: {
              browsers: ['last 1 Chrome versions']
            }
          }
        ]
      ]
    },

    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: 'entry',
            corejs: 'core-js@3',
            targets: {
              browsers: ['last 3 versions', 'not IE < 11']
            }
          }
        ]
      ]
    },
    // Used as the default for running babel-node scripts
    // The env used to run the webpack.config.babel.js
    development: {
      sourceMaps: 'both',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '10'
            }
          }
        ]
      ]
    },
    // Used by Jest to run tests
    test: {
      sourceMaps: 'both',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '10'
            }
          }
        ]
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        'transform-amd-to-commonjs',
        'dynamic-import-node'
      ]
    }
  }
};
