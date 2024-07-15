module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'thelifeisyours',
          name: 'mc-app',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
