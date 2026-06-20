import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';

// Native ESLint 10 flat config. Replaces the previous FlatCompat/eslintrc setup,
// which crashes under ESLint 10. Uses the Next.js plugin's native flat config plus
// typescript-eslint's recommended rules.
export default tseslint.config(
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...tseslint.configs.recommended,
  nextPlugin.configs['core-web-vitals'],
);
