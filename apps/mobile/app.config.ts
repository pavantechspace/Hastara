import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Hastara',
  slug: 'hastara',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'hastara',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0D3B2E',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.hastara.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0D3B2E',
    },
    package: 'com.hastara.app',
  },
  plugins: [
    'expo-router',
    'expo-camera',
    'expo-notifications',
    ['expo-av', { microphonePermission: false }],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
