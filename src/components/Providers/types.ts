import { providers_locales } from '@/i18n'

import type { Control, UseFormRegister } from 'react-hook-form'
import type { default as DataModel } from './model'

export type ProvidersLocales = typeof providers_locales

export interface TabTab {
	type: 'tab'
	layout: 'between' | 'scroll'
}

export interface ListTab {
	type: 'list'
}

export interface IPropsProviders {
	config: Config
	variant?: {
		tab?: TabTab | ListTab
		model?: 'list' | 'card'
	}
	locales?: Partial<ProvidersLocales>
	width?: number | string
	onChange: (v: Config) => void
	onTest?: (provider: PresetProvider | SpecialProvider) => Promise<boolean>
}

export interface ArgsInit extends Pick<IPropsProviders, 'config' | 'onChange' | 'onTest'> {}

export interface IPropsTab {
	locales: ProvidersLocales['providers']
	tab: Required<IPropsProviders>['variant']['tab']
	items: Array<Pick<Provider, 'name' | 'enabled'>>
	current_tab: DataModel['current_tab']
	onChangeCurrentTab: (v: number) => void
}

export interface IPropsTabItem extends Pick<IPropsTab, 'onChangeCurrentTab'> {
	index: number
	item: IPropsTab['items'][number]
	display_name: string
	active: boolean
}

export interface IPropsForm {
	provider: Config['providers'][number]
	locales: ProvidersLocales['form']
	test: DataModel['test']
	current_model: DataModel['current_model']
	adding_model: DataModel['adding_model']
	onTest: DataModel['onTest']
	onProviderChange: DataModel['onProviderChange']
	onChangeCurrentModel: (v: number) => void
	toggleAddingModel: () => void
}

export interface IPropsFormAPIKey extends Pick<IPropsForm, 'test' | 'onTest'> {
	api_key: IPropsForm['provider']['api_key']
	register: UseFormRegister<IPropsForm['provider']>
}

export interface IPropsFormBaseUrl {
	base_url: IPropsForm['provider']['base_url']
	register: UseFormRegister<IPropsForm['provider']>
}

export interface IPropsFormCustomFields {
	custom_fields: SpecialProvider['custom_fields']
	register: UseFormRegister<IPropsForm['provider']>
}

export interface IPropsFormModels extends Pick<IPropsForm, 'current_model' | 'onChangeCurrentModel'> {
	locales: IPropsForm['locales']
	models: SpecialProvider['models']
	control: Control<IPropsForm['provider']>
	register: UseFormRegister<IPropsForm['provider']>
}

export interface IPropsFormModel extends Pick<IPropsFormModels, 'control' | 'onChangeCurrentModel'> {
	locales_desc: IPropsFormModels['locales']['desc']
	index: number
	item: Model
	desc_keys: Array<string>
}

export interface IPropsFormModelForm {
	locales_features: IPropsFormModels['locales']['features']
	control: Control<IPropsForm['provider']> | Control<Model>
	index?: number
	item?: Model
	adding_model?: DataModel['adding_model']
	register: UseFormRegister<IPropsForm['provider']> | UseFormRegister<Model>
}

export interface IPropsFormModelFormFeatures {
	locales_features: IPropsFormModelForm['locales_features']
}

export interface IPropsCustom {
	custom_providers: Config['custom_providers']
}

export interface Config {
	providers: Array<ConfigProvider>
	custom_providers?: Array<Provider>
}

export type ConfigProvider = PresetProvider | SpecialProvider

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
	fid?: string
	desc?: string
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
