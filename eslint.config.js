import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...pluginReactConfig,
    rules: {
      ...pluginReactConfig.rules,
      "react/no-unknown-property": ["error", { "ignore": ["css"] }],
      'react/react-in-jsx-scope': 'off',
    },
  },
];
