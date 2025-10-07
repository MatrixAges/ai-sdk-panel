import { defineConfig } from '@rslib/core'

import type { RslibConfig } from '@rslib/core'

const is_dev = process.env.NODE_ENV === 'development'
const is_prod = process.env.NODE_ENV === 'production'
const postcss_plugins = ['postcss-import', 'postcss-nested', '@tailwindcss/postcss', 'autoprefixer']

const prod_output = {} as RslibConfig['output']

// if (is_prod) prod_output!['minify'] = {}

console.log(process.env.NODE_ENV)

export default defineConfig({
	mode: is_dev ? 'development' : 'production',
	lib: [{ format: 'esm', autoExternal: false, dts: true }],
	source: {
		entry: { index: './src/index.ts' },
		tsconfigPath: './tsconfig.json'
	},
	output: {
		target: 'web',
		sourceMap: is_dev,
		// injectStyles: true,
		distPath: { root: './dist' },
		cleanDistPath: is_prod,
		externals: ['react', 'react-dom'],
		...prod_output
	},
	tools: {
		lightningcssLoader: {
			targets: 'chrome >= 120',
			exclude: { isSelector: true }
		},
		postcss: { postcssOptions: { config: false, plugins: postcss_plugins } }
	},
	server: {
		publicDir: { copyOnBuild: false }
	}
})
