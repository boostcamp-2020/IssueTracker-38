module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
        useBuiltIns: 'usage',
        corejs: '3',
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop',
  ],
};
