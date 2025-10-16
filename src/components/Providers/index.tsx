import 'react-horizontal-scrolling-menu/dist/styles.css'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepmerge } from 'deepmerge-ts'
import { deepEqual } from 'fast-equals'
import { motion } from 'motion/react'
import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

import { providers_locales } from '@/i18n'
import { copy, memo } from '@/utils'

import AnimateBox from '../AnimateBox'
import { Custom, Form, Tab } from './components'
import Model from './model'

import type { IPropsCustom, IPropsForm, IPropsProviders, IPropsTab } from './types'

const Index = (props: IPropsProviders) => {
	const { config, variant, locales, width, onChange, onTest } = props
	const { tab, model = 'list' } = variant || {}
	const state = useRef(proxy(new Model()))
	const x = useProxy(state.current)
	const target_config = copy(x.config)
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
			x.current_tab = v
		})
	}

	const props_form: IPropsForm = {
		locales: target_locales['form']!,
		provider: copy(x.provider),
		test: copy(x.test),
		current_model: x.current_model,
		onTest: x.onTest,
		onProviderChange: x.onProviderChange,
		onChangeCurrentModel: useMemoizedFn((v: number) => {
			x.current_model = v === x.current_model ? null : v
		})
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
			</AnimateBox>
		</div>
	)
}

export default memo(Index)

export * from './types'
