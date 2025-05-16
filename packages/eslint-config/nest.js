import globals from 'globals';
import tseslint from 'typescript-eslint';
import { baseConfig } from './base.js';

export default tseslint.config(...baseConfig, {
	ignores: ['webpack.config.js'],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	  },
});