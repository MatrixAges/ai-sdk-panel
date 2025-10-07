import { defineConfig } from '@rslib/core'

const is_dev = process.env.NODE_ENV === 'development'
const is_prod = process.env.NODE_ENV === 'production'

export default defineConfig({
	mode: is_dev ? 'development' : 'production',
	lib: [{ format: 'esm', dts: true }],
	source: {
		entry: { index: './ai-sdk-panel/index.ts' }
	},
	output: {
		target: 'web',
		sourceMap: is_dev,
		injectStyles: true,
		cleanDistPath: is_prod,
		filename: { js: '[name]/index.js' },
		externals: ['react', 'react-dom']
	},
	tools: {
		lightningcssLoader: {
			targets: 'chrome >= 120',
			exclude: { isSelector: true }
		},
		postcss: { postcssOptions: { config: true } }
	}
})
