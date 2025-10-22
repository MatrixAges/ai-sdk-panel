import 'react-horizontal-scrolling-menu/dist/styles.css'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepmerge } from 'deepmerge-ts'
import { deepEqual } from 'fast-equals'
import { proxy } from 'valtio'
import { deepClone, useProxy } from 'valtio/utils'

import { AnimateBox, Show } from '@/components'
import { providers_locales } from '@/i18n'
import { memo } from '@/utils'

import { Custom, Disabled, Form, Tab } from './components'
import Model from './model'

import type { IPropsCustom, IPropsDisabled, IPropsForm, IPropsProviders, IPropsTab } from './types'

const Index = (props: IPropsProviders) => {
	const { config, locales, tab, width, onChange, onTest } = props
	const state = useRef(proxy(new Model()))
	const x = useProxy(state.current)
	const target_config = deepClone(x.config)
	const providers = deepClone(x.providers)
	const target_locales = deepmerge(providers_locales, locales)

	useLayoutEffect(() => {
		if (deepEqual(config, x.config)) return

		x.init({ config, onChange, onTest })
	}, [config, onChange, onTest])

	const locales_providers = useMemo(
		() => ({ ...providers_locales.providers, ...locales?.providers }),
		[locales?.providers]
	)

	const props_tab: IPropsTab = {
		locales: locales_providers,
		tab,
		items: deepClone(x.tabs),
		current_tab: x.current_tab,
		onChangeCurrentTab: x.onChangeCurrentTab,
		onDragProvider: x.onDragProvider
	}

	const props_form: IPropsForm = {
		locales: target_locales['form']!,
		provider: deepClone(x.provider),
		test: deepClone(x.test),
		current_model: x.current_model,
		adding_model: x.adding_model,
		onTest: x.onTest,
		onChangeProvider: x.onChangeProvider,
		download: x.download,
		upload: x.upload,
		onChangeCurrentModel: useMemoizedFn((v: number) => {
			x.current_model = v === x.current_model ? null : v
		}),
		toggleAddingModel: useMemoizedFn(() => (x.adding_model = !x.adding_model)),
		onDisableProvider: x.onToggleProvider
	}

	const props_custom: IPropsCustom = {
		locales: target_locales['form']!,
		custom_providers: deepClone(target_config?.custom_providers),
		onChangeCustomProviders: x.onChangeCustomProviders
	}

	const props_disabled: IPropsDisabled = {
		locales: locales_providers,
		items: providers.disabled,
		onEnableProvider: x.onEnableProvider
	}

	if (!x.config || !target_config) return

	return (
		<div style={{ width }} className='flex flex-col items-center gap-8'>
			<Tab {...props_tab} />
			<AnimateBox className='w-full'>
				{x.current_tab === props_tab.items.length - 1 ? (
					<Disabled {...props_disabled} />
				) : x.current_tab === props_tab.items.length - 2 ? (
					<Custom {...props_custom} />
				) : (
					<Form {...props_form} />
				)}
				<Show
					className='py-2 text-rose-400 text-xsm overflow-hidden'
					visible={x.upload_error !== ''}
					initial={{ opacity: 0, width: 0 }}
					animate={{ opacity: 1, width: 'auto' }}
				>
					{x.upload_error}
				</Show>
			</AnimateBox>
		</div>
	)
}

export default memo(Index)

export * from './types'
