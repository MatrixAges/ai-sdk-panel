import 'react-horizontal-scrolling-menu/dist/styles.css'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepEqual } from 'fast-equals'
import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

import { providers_locales } from '@/i18n'
import { copy, memo } from '@/utils'

import { Custom, Form, Tab } from './components'
import Model from './model'

import type { IPropsCustom, IPropsForm, IPropsProviders, IPropsTab } from './types'

const Index = (props: IPropsProviders) => {
	const { value, tab, model_type = 'list', locales, width, onChange, onTest } = props
	const state = useRef(proxy(new Model()))
	const x = useProxy(state.current)
	const target_config = copy(x.config)

	useLayoutEffect(() => {
		if (deepEqual(value, x.config)) return

		x.init({ value, onChange, onTest })
	}, [value, onChange, onTest])

	const props_tab: IPropsTab = {
		locales: useMemo(() => ({ ...providers_locales.providers, ...locales?.providers }), [locales?.providers]),
		tab,
		items: useMemo(() => {
			if (!target_config) return []

			return target_config.providers
				.map(item => ({ name: item.name, enabled: item.enabled }))
				.concat({ name: 'custom', enabled: true }, { name: 'disabled', enabled: true })
		}, [target_config]),
		current: x.current,
		onChangeCurrent: useMemoizedFn((v: string) => (x.current = v))
	}

	const props_form: IPropsForm = {
		locales: useMemo(() => ({ ...providers_locales.desc, ...locales?.desc }), [locales?.desc]),
		provider: copy(x.provider),
		test: copy(x.test),
		onTest: x.onTest,
		onProviderChange: x.onProviderChange
	}

	const props_custom: IPropsCustom = {
		custom_providers: target_config?.custom_providers
	}

	if (!x.config) return null

	return (
		<div style={{ width }} className='flex flex-col items-center gap-8'>
			<Tab {...props_tab} />
			{x.current === 'custom' ? <Custom {...props_custom} /> : <Form {...props_form} />}
		</div>
	)
}

export default memo(Index)

export * from './types'
