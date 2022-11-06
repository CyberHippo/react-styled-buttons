module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
  core: {
    builder: 'webpack5',
  },
};
