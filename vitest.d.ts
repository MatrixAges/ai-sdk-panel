import type { Download } from 'playwright-core'

declare module 'vitest/browser' {
	interface BrowserCommands {
		getPath: (path: string) => Promise<string>
		downloadFile: (text: string) => Promise<{ name: string; path: string }>
		uploadFile: (args: { element_text: string; path: string }) => Promise<void>
	}
}
