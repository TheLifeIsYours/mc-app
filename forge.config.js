module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'TheLifeIsYours',
          name: 'mc-app',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
