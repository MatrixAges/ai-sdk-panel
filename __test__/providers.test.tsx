import { beforeEach, expect, test } from 'vitest'
import { commands, server } from 'vitest/browser'

import { all_providers, preset_providers, Providers } from '@matrixages/ai-sdk-panel'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { sleep } from './utils'

import type { Config, ConfigProvider, IPropsProviders } from '@matrixages/ai-sdk-panel'

const { readFile, writeFile, removeFile } = server.commands

let user = userEvent.setup()

let config = null as Config | null
let provider = null as ConfigProvider | null

const props_providers: Partial<IPropsProviders> = {
	width: 690,
	onChange: v => {
		config = v
	},
	onTest: async v => {
		provider = v

		await sleep(500)

		return true
	}
}

const props_providers_preset = {
	config: { providers: preset_providers },
	tab: 'between',
	...props_providers
} as IPropsProviders

const props_providers_all = {
	config: { providers: all_providers },
	tab: 'scroll',
	width: 690,
	...props_providers
} as IPropsProviders

const api_key = 'sk-test-proj-abcdef1234567890abcdef1234567890'

beforeEach(async () => {
	config = null
	user = userEvent.setup()

	await user.click(screen.getByText('OpenAI', { selector: 'span', exact: true }))

	document.documentElement.removeAttribute('data-theme')
})

const { unmount } = render(<Providers {...props_providers_preset} />)

test('dark theme', async () => {
	document.documentElement.setAttribute('data-theme', 'dark')

	const actions_title = screen.getByText('Actions', { selector: 'span' })
	const actions_wrap = actions_title.nextElementSibling!

	const background = window.getComputedStyle(actions_wrap).getPropertyValue('background-color')

	expect(background).toBe('oklch(0 0 0 / 0.6)')
})

test('toggle tab', async () => {
	await user.click(screen.getByText('Anthropic', { selector: 'span', exact: true }))

	expect(screen.getByText('Claude Sonnet 4.5')).toBeInTheDocument()
})

test('input api key', async () => {
	const api_key_title = screen.getByText('API Key', { selector: 'span' })
	const api_key_input = api_key_title.nextElementSibling!.children[0]

	await user.click(api_key_input)

	expect(api_key_input).toHaveFocus()

	await user.type(api_key_input, api_key)

	expect(api_key_input).toHaveValue(api_key)
	expect(config!.providers[0].api_key).toBe(api_key)
})

test('api key onTest', async () => {
	const api_key_title = screen.getByText('API Key', { selector: 'span' })
	const btn_test = api_key_title.nextElementSibling!.querySelector('.btn')!

	await user.click(btn_test)

	expect(btn_test).toHaveClass('animate-spin')
	expect(provider!.api_key).toBe(api_key)

	await sleep(500)

	expect(btn_test).toHaveClass('text-lime-500')

	await sleep(2400)

	expect(btn_test).not.toHaveClass('text-lime-500')
})

test('disable and enable model', async () => {
	const model = screen.getByText('GPT 5', { selector: 'span', exact: true })
	const switcher = model.parentElement!.nextElementSibling!.children[0].children[0]!

	await user.click(switcher)

	expect(config!.providers[0].models![0].enabled).toBe(false)

	await user.click(switcher)

	expect(config!.providers[0].models![0].enabled).toBe(true)
})

test('toggle model', async () => {
	const model = screen.getByText('GPT 5', { selector: 'span', exact: true })

	await user.click(model)

	const input = screen.getByDisplayValue('gpt-5')

	expect(input).toBeInTheDocument()
	expect(input.tagName).toBe('INPUT')

	await user.click(model)
	await sleep(300)

	expect(input).not.toBeInTheDocument()
})

test('edit model', async () => {
	const model = screen.getByText('GPT 5', { selector: 'span', exact: true })

	await user.click(model)

	const desc_input = document.querySelector('input[name="models.0.desc"]')!
	const desc = 'GPT 5 is the best model of OpenAI'

	await user.type(desc_input, desc)

	expect(desc_input).toHaveValue(desc)
	expect(config!.providers[0].models![0].desc).toBe(desc)

	fireEvent.change(desc_input, { target: { value: '' } })

	expect(config!.providers[0].models![0].desc).toBe('')

	await user.click(model)
})

const addModel = async () => {
	const add_model_button = screen.getByText('Add Model', { selector: 'button', exact: true })

	await user.click(add_model_button)

	const add_form_title = screen.getByText('Add Model', { selector: 'div', exact: true })
	const add_form = add_form_title.parentElement!.parentElement!

	const model_id_input = add_form.querySelector('input[placeholder="Input model ID"]')!
	const model_name_input = add_form.querySelector('input[placeholder="Input model name"]')!

	await user.type(model_id_input, 'gpt-x')
	await user.type(model_name_input, 'GPT X')

	await user.click(screen.getByText('Submit', { selector: 'button', exact: true }))
}

test('add model', async () => {
	addModel()

	await sleep(300)

	const gpt_x = screen.getByText('GPT X', { selector: 'span', exact: true })

	expect(gpt_x).toBeInTheDocument()
	expect(config?.providers[0].models![0].id).toBe('gpt-x')
	expect(config?.providers[0].models![0].name).toBe('GPT X')
})

test('remove model', async () => {
	const gpt_x = screen.getByText('GPT X', { selector: 'span', exact: true })

	await user.click(gpt_x)

	const btn_remove = gpt_x.parentElement!.nextElementSibling!.children[0]

	await user.click(btn_remove)

	expect(gpt_x).not.toBeInTheDocument()
})

test('reset model', async () => {
	addModel()

	await sleep(600)

	const gpt_x = screen.getByText('GPT X', { selector: 'span', exact: true })

	expect(gpt_x).toBeInTheDocument()

	await user.click(screen.getByText('Reset Model', { selector: 'button', exact: true }))

	expect(gpt_x).not.toBeInTheDocument()
})

test('export config', async () => {
	const { name, path } = await commands.downloadFile('Export Config')

	expect(name).toBe('ai-sdk-panel.config.json')
	expect(path).toBeDefined()

	const file = await readFile(path)
	const config = JSON.parse(file) as Config

	expect(config.providers[0].name).toBe('openai')
})

test('import config', async () => {
	const path = '__downloads__/ai-sdk-panel.config.json'
	const file_path = await commands.getPath(path)

	const file = await readFile(file_path)
	const config = JSON.parse(file) as Config

	config.providers[0].models!.unshift({ id: 'gpt-y', name: 'GPT Y', enabled: true })

	await writeFile(file_path, JSON.stringify(config, null, 6))

	await commands.uploadFile({ element_text: 'Import Config', path })
	await sleep(600)

	const gpt_y = screen.getByText('GPT Y', { selector: 'span', exact: true })

	expect(gpt_y).toBeInTheDocument()
	expect(config?.providers[0].models![0].id).toBe('gpt-y')
	expect(config?.providers[0].models![0].name).toBe('GPT Y')

	await removeFile(file_path)
})

test('disable and enable provider', async () => {
	await user.click(screen.getByText('Disable Provider', { selector: 'button', exact: true }))

	expect(config!.providers[0].enabled).toBe(false)

	await user.click(screen.getByText('Disabled', { selector: 'span', exact: true }))

	const openai = screen.getByText('OpenAI', { selector: 'span', exact: true })

	expect(openai).toBeInTheDocument()

	const switcher = openai.parentElement!.nextElementSibling!.children[0]

	await user.click(switcher)

	expect(screen.getByText('No providers disabled', { selector: 'div', exact: true })).toBeInTheDocument()

	expect(config!.providers[0].enabled).toBe(true)
})

test('add custom provider', async () => {
	await user.click(screen.getByText('Custom', { selector: 'span', exact: true }))
	await user.click(screen.getByText('Add Provider', { selector: 'button', exact: true }))

	const add_form_title = screen.getByText('Add Provider', { selector: 'div', exact: true })
	const add_form = add_form_title.parentElement!.parentElement!

	const provider_name_input = add_form.querySelector('input[placeholder="Input Provider Name"]')!
	const base_url_input = add_form.querySelector('input[placeholder="Input Base URL"]')!

	await user.type(provider_name_input, 'Acme')
	await user.type(base_url_input, 'https://acme.ai/v1/')

	await user.click(screen.getByText('Submit', { selector: 'button', exact: true }))

	expect(screen.getByText('Acme', { selector: 'span', exact: true })).toBeInTheDocument()
	expect(config!.custom_providers![0].name).toBe('Acme')
})

test('disable and enable custom provider', async () => {
	await user.click(screen.getByText('Custom', { selector: 'span', exact: true }))

	const acme_title = screen.getByText('Acme', { selector: 'span', exact: true })
	const switcher = acme_title.nextElementSibling!.children[1].children[0]

	await user.click(switcher)

	expect(config!.custom_providers![0].enabled).toBe(false)

	await user.click(switcher)

	expect(config!.custom_providers![0].enabled).toBe(true)
})

test('remove custom provider', async () => {
	await user.click(screen.getByText('Custom', { selector: 'span', exact: true }))

	const acme_title = screen.getByText('Acme', { selector: 'span', exact: true })
	const btn_remove = acme_title.nextElementSibling!.children[0]

	await user.click(btn_remove)

	expect(acme_title).not.toBeInTheDocument()
})

test('all providers', async () => {
	unmount()

	render(<Providers {...props_providers_all} />)

	const scroller = document.querySelector('.overflow-scroll.no-scrollbar')!

	fireEvent.wheel(scroller, { target: { scrollLeft: 9999 } })

	expect(screen.getByText('Disabled', { selector: 'span', exact: true })).toBeInViewport()
})

// console.log('-------')
// console.log(file_path)
// console.log('-------')
