import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

import type { RslibConfig } from '@rslib/core'

const is_dev = process.env.NODE_ENV === 'development'
const is_prod = process.env.NODE_ENV === 'production'
const postcss_plugins = ['postcss-import', 'postcss-nested', '@tailwindcss/postcss', 'autoprefixer']

const prod_output = {} as RslibConfig['output']

if (is_prod) prod_output!['minify'] = {}

export default defineConfig({
	mode: is_dev ? 'development' : 'production',
	lib: [{ format: 'esm', autoExternal: is_dev, externalHelpers: true, dts: true }],
	output: {
		target: 'web',
		injectStyles: true,
		sourceMap: is_dev,
		cleanDistPath: is_prod,
		externals: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
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
	},
	plugins: [pluginReact()]
})
