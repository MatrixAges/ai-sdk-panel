import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

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
			viewport: { width: 790, height: 1080 }
		}
	}
})
