module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	plugins: ['promise'],
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/standard'],
	rules: {
		'no-console': 'off',
		'no-regex-spaces': 'off',
		'no-unused-vars': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-undef': 'off',
		'no-template-curly-in-string': 1,
		'consistent-return': 1,
		'array-callback-return': 1,
		eqeqeq: 2,
		'no-alert': 2,
		'no-caller': 2,
		'no-eq-null': 2,
		'no-eval': 2,
		'no-extend-native': 1,
		'no-extra-bind': 1,
		'no-extra-label': 1,
		'no-floating-decimal': 2,
		'no-implicit-coercion': 1,
		'no-loop-func': 1,
		'no-new-func': 2,
		'no-new-wrappers': 1,
		'no-throw-literal': 2,
		'prefer-promise-reject-errors': 2,
		'for-direction': 2,
		'getter-return': 2,
		'no-await-in-loop': 2,
		'no-compare-neg-zero': 2,
		'no-catch-shadow': 1,
		'no-shadow-restricted-names': 2,
		'callback-return': 2,
		'handle-callback-err': 2,
		'no-path-concat': 1,
		'prefer-arrow-callback': 1,
		'promise/no-nesting': 1,
		'no-var': 'error',
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false
			}
		],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always'
			}
		],
		indent: ['warn', 'tab'],
		'no-tabs': 'off'
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2017,
		sourceType: 'module'
	}
}
