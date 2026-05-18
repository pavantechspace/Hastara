import type { Config } from 'tailwindcss';
import sharedConfig from '@hastara/config/tailwind';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nativewind = require('nativewind/preset');

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  presets: [sharedConfig, nativewind],
};

export default config;
