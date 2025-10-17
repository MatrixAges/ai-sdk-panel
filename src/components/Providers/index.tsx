import 'react-horizontal-scrolling-menu/dist/styles.css'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepmerge } from 'deepmerge-ts'
import { deepEqual } from 'fast-equals'
import { proxy } from 'valtio'
import { deepClone, useProxy } from 'valtio/utils'

import { Show } from '@/components'
import { providers_locales } from '@/i18n'
import { memo } from '@/utils'

import AnimateBox from '../AnimateBox'
import { Custom, Form, Tab } from './components'
import Model from './model'

import type { IPropsCustom, IPropsForm, IPropsProviders, IPropsTab } from './types'

const Index = (props: IPropsProviders) => {
	const { config, variant, locales, width, onChange, onTest } = props
	const { tab, model = 'list' } = variant || {}
	const state = useRef(proxy(new Model()))
	const x = useProxy(state.current)
	const target_config = deepClone(x.config)
	const target_locales = deepmerge(providers_locales, locales)

	useLayoutEffect(() => {
		if (deepEqual(config, x.config)) return

		x.init({ config, onChange, onTest })
	}, [config, onChange, onTest])

	const props_tab: IPropsTab = {
		locales: useMemo(() => ({ ...providers_locales.providers, ...locales?.providers }), [locales?.providers]),
		tab,
		items: useMemo(() => {
			if (!target_config) return []

			return target_config.providers
				.map(item => ({ name: item.name, enabled: item.enabled }))
				.concat({ name: 'custom', enabled: true }, { name: 'disabled', enabled: true })
		}, [target_config]),
		current_tab: x.current_tab,
		onChangeCurrentTab: useMemoizedFn((v: number) => {
			x.current_model = null
			x.adding_model = false
			x.current_tab = v
		})
	}

	const props_form: IPropsForm = {
		locales: target_locales['form']!,
		provider: deepClone(x.provider),
		test: deepClone(x.test),
		current_model: x.current_model,
		adding_model: x.adding_model,
		onTest: x.onTest,
		onProviderChange: x.onProviderChange,
		download: x.download,
		upload: x.upload,
		onChangeCurrentModel: useMemoizedFn((v: number) => {
			x.current_model = v === x.current_model ? null : v
		}),
		toggleAddingModel: useMemoizedFn(() => (x.adding_model = !x.adding_model))
	}

	const props_custom: IPropsCustom = {
		custom_providers: target_config?.custom_providers
	}

	if (!x.config || !target_config) return

	return (
		<div style={{ width }} className='flex flex-col items-center gap-8'>
			<Tab {...props_tab} />
			<AnimateBox className='w-full'>
				{x.current_tab === props_tab.items.length - 1 ? (
					<Custom {...props_custom} />
				) : (
					<Form {...props_form} />
				)}
				<Show
					className='text-rose-400 text-xsm overflow-hidden py-2'
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
