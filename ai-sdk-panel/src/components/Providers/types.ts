import i18n from '@/i18n'

import type { Model as DataModel } from './model'

export interface IPropsProviders {
	config: Config
	tab_type?: 'tab' | 'list'
	model_type?: 'list' | 'card'
	borderless?: boolean
	i18n?: Record<keyof typeof i18n.providers, string>
}

export interface IPropsTab {
	tab_type: IPropsProviders['tab_type']
	items: Array<Pick<Provider, 'name' | 'enabled'>>
}

export interface IPropsForm {}

export interface Config {
	providers: Array<PresetProvider | SpecialProvider>
	custom_providers?: Array<Provider>
}

export interface Provider {
	name: string
	api_key: string
	base_url: string
	enabled: boolean
	models: Array<Model>
	headers?: string
}

export interface PresetProvider extends Omit<Provider, 'base_url'> {
	api_key: string
	base_url?: string
	custom_models?: Array<Model>
}

export interface SpecialProvider extends Partial<Omit<Provider, 'name' | 'enabled'>> {
	name: string
	enabled: boolean
	custom_fields?: Record<string, string>
}

export interface Model {
	name: string
	id: string
	enabled: boolean
	features?: Features
}

export interface Features {
	vision?: boolean
	voice?: boolean
	function_calling?: boolean
	structured_output?: boolean
	reasoning?: boolean
	reasoning_optional?: boolean
	web_search?: boolean
	image_input?: boolean
	image_output?: boolean
	embedding?: boolean
	reranking?: boolean
}
