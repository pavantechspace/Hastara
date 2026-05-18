import type { Config } from 'tailwindcss';
import sharedConfig from '@hastara/config/tailwind';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  presets: [sharedConfig],
};

export default config;
