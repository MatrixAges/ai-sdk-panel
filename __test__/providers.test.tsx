import { beforeEach, expect, test } from 'vitest'

import { all_providers, preset_providers, Providers } from '@matrixages/ai-sdk-panel'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { sleep } from './utils'

import type { Config, ConfigProvider, IPropsProviders } from '@matrixages/ai-sdk-panel'

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
	...props_providers
} as IPropsProviders

// console.log('-------')
// console.log('background: ', background)
// console.log('-------')

beforeEach(() => {
	config = null
	user = userEvent.setup()

	document.documentElement.removeAttribute('data-theme')
})

render(<Providers {...props_providers_preset} />)

test('dark theme', async () => {
	document.documentElement.setAttribute('data-theme', 'dark')

	const actions_title = screen.getByText('Actions', { selector: 'span' })
	const actions_wrap = actions_title.nextElementSibling!

	const background = window.getComputedStyle(actions_wrap).getPropertyValue('background-color')

	expect(background).toBe('oklch(0 0 0 / 0.6)')
})

test('toggle tab', async () => {
	await user.click(screen.getByText('Anthropic', { selector: 'span' }))

	expect(screen.getByText('Claude Sonnet 4.5')).toBeInTheDocument()

	await user.click(screen.getByText('Anthropic', { selector: 'span' }))
})

test('input api key', async () => {
	const api_key_title = screen.getByText('API Key', { selector: 'span' })
	const api_key_input = api_key_title.nextElementSibling!.children[0]

	await user.click(api_key_input)

	expect(api_key_input).toHaveFocus()

	const api_key = 'sk-test-proj-abcdef1234567890abcdef1234567890'

	await user.type(api_key_input, api_key)

	expect(api_key_input).toHaveValue(api_key)

	console.log('-------')
	console.log('config: ', config)
	console.log('-------')
})
