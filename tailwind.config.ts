import type { Config } from 'tailwindcss';
import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from 'tailwindcss-scoped-preflight';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(
        '.tw',
        // optional, to exclude some elements under .tw from being preflighted, like external markup
        { except: '.no-tw' },
      ),
    }),
  ],
} satisfies Config;
