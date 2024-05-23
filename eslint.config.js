import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import recommendedReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    settings: {
      react: {
        version: '18',
      },
    },
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...recommendedReactConfig,
    rules: {
      ...recommendedReactConfig.rules,
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/react-in-jsx-scope': 'off',
    },
  },
];
