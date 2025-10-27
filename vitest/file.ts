import { mkdirSync } from 'fs'
import { basename, join, resolve } from 'path'

import type { Download } from 'playwright-core'
import type { BrowserCommand } from 'vitest/node'

export const getPath: BrowserCommand<[string]> = (_, path) => {
	return resolve(process.cwd(), `./__test__/${path}`)
}

const finishFileDownload: BrowserCommand<[Promise<Download>]> = async (_, download_promise) => {
	const download = await download_promise
	const filename = download.suggestedFilename()

	const directory = resolve(process.cwd(), './__test__/__downloads__/')

	mkdirSync(directory, { recursive: true })

	const path = join(directory, filename)

	await download.saveAs(path)

	return { name: basename(path), path }
}

export const downloadFile: BrowserCommand<[string]> = async (ctx, element_text) => {
	const download = ctx.page.waitForEvent('download')
	const element = ctx.iframe.getByText(element_text, { exact: true })

	await element.click()

	return finishFileDownload(ctx, download)
}

export const uploadFile: BrowserCommand<[{ element_text: string; path: string }]> = async (
	ctx,
	{ element_text, path }
): Promise<void> => {
	const file_chooser_promise = ctx.page.waitForEvent('filechooser')

	const element = ctx.iframe.getByText(element_text, { exact: true })

	await element.click()

	const file_chooser = await file_chooser_promise

	const target_path = getPath(ctx, path)

	await file_chooser.setFiles(target_path)
}
