module.exports = {
  publishers: [
    {
      name: '@electron-forge/thelifeisyours',
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
