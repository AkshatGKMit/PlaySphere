export const TestIds = {
  unit: {
    bannerImageView: {
      root: 'banner-image-container',
      imagePrefix: 'banner-images',
      image: (index: number) => `banner-images${index}`,
    },
    loader: 'loader',
    actionButton: {
      root: 'action-button-container',
    },
    appIntro: {
      root: 'app-intro-container',
      appLogo: 'app-intro-logo',
      appName: 'app-intro-name',
      appTagLine: 'app-intro-tag-line',
    },
  },
  integration: {
    splash: {
      root: 'splash-screen',
    },
  },
};
