import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

import { dependencies } from './package.json'
import { downloadFile, getPath, uploadFile } from './vitest/file'

const ui = Boolean(process.env.UI)

export default defineConfig({
	plugins: [react()],
	test: {
		include: ['__test__/**/*.{test,spec}.{ts,tsx}'],
		browser: {
			enabled: true,
			ui,
			provider: playwright(),
			instances: [{ browser: 'chromium', headless: !ui }],
			viewport: { width: 790, height: 1080 },
			commands: {
				getPath,
				downloadFile,
				uploadFile
			}
		},
		pool: 'threads',
		maxWorkers: 4
	},
	resolve: {
		alias: {
			'@matrixages/ai-sdk-panel': resolve(__dirname, './dist/')
		}
	},
	optimizeDeps: {
		include: Object.keys(dependencies).filter(item => item !== '@lobehub/icons-static-svg')
	}
})
