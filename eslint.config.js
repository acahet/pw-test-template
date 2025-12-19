import eslint from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.js", "*.mjs", "eslint.config.js"],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/explicit-function-return-type": "error",
		},
	},

	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	...tseslint.configs.strict,

	{
		...playwright.configs["flat/recommended"],
		files: ["tests/**/*.ts"],
		rules: {
			"playwright/expect-expect": 1,
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			//TODO: return to review these rules later
			"@typescript-eslint/no-explicit-any": "off", //previously as error!
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/dot-notation": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/unbound-method": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/non-nullable-type-assertion-style": "off",
			//EOR - end of review
			"playwright/no-skipped-test": "warn",
			"playwright/no-standalone-expect": "error",
			"playwright/no-page-pause": "error",
			"playwright/max-nested-describe": ["warn", { max: 3 }],
		},
	},
	{
		ignores: [
			".github/**",
			".husky/**",
			"node_modules/**",
			"test-results/**",
			"tests/report/**",
			"playwright/.cache/**",
			".auth/**",
			".env",
			"*-snapshots/**",
			"scripts/**",
		],
	},
];
