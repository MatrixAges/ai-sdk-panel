import 'react-horizontal-scrolling-menu/dist/styles.css'

import { useLayoutEffect, useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepEqual } from 'fast-equals'
import { useProxy } from 'valtio/utils'

import { providers_locales } from '@/i18n'
import { copy, memo } from '@/utils'

import { Custom, Form, Tab } from './components'
import model from './model'

import type { IPropsCustom, IPropsForm, IPropsProviders, IPropsTab } from './types'

const Index = (props: IPropsProviders) => {
	const { config, borderless = true, tab, model_type = 'list', locales, width } = props
	const x = useProxy(model)
	const target_config = copy(x.config)

	useLayoutEffect(() => {
		if (deepEqual(config, x.config)) return

		x.init(config)
	}, [config])

	const props_tab: IPropsTab = {
		locales: useMemo(() => ({ ...providers_locales, ...locales }), [locales]),
		tab,
		items: useMemo(() => {
			if (!target_config) return []

			return target_config.providers
				.map(item => ({ name: item.name, enabled: item.enabled }))
				.concat({ name: 'custom', enabled: true })
		}, [target_config]),
		current: x.current,
		onChangeCurrent: useMemoizedFn((v: string) => (x.current = v))
	}

	const props_form: IPropsForm = {
		provider: useMemo(
			() => target_config?.providers.find(item => item.name === x.current)!,
			[target_config, x.current]
		)
	}

	const props_custom: IPropsCustom = {
		custom_providers: target_config?.custom_providers
	}

	if (!x.config) return null

	return (
		<div className='flex flex-col items-center gap-8' style={{ width }}>
			<Tab {...props_tab} />
			{x.current === 'custom' ? <Custom {...props_custom} /> : <Form {...props_form} />}
		</div>
	)
}

export default memo(Index)

export * from './providers'
export * from './types'
