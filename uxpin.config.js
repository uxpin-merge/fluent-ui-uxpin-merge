module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/PrimaryButton/PrimaryButton.tsx',
        ],
      },
    ],
    wrapper: 'src/components/UXPinWrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Fluent UI React'
};
