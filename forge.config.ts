module.exports = {
  publishers: [
    {
      name: '@electron-forge/mc-app',
      config: {
        author: 'TheLifeIsYours',
        description: 'Minecraft server status app',
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
