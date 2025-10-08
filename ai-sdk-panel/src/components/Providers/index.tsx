import { useLayoutEffect, useMemo } from 'react'
import { deepEqual } from 'fast-equals'
import { useProxy } from 'valtio/utils'

import { copy, memo } from '@/utils'

import { Form, Tab } from './components'
import model from './model'

import type { IPropsForm, IPropsProviders, IPropsTab } from './types'

const Index = (props: IPropsProviders) => {
	const { config, borderless = true, tab_type = 'tab', model_type = 'list', i18n } = props
	const x = useProxy(model)
	const target_config = copy(x.config)

	useLayoutEffect(() => {
		if (deepEqual(config, x.config)) return

		x.init(config)
	}, [config])

	const props_tab: IPropsTab = {
		tab_type,
		items: useMemo(() => {
			if (!target_config) return []

			return target_config.providers
				.map(item => ({ name: item.name, enabled: item.enabled }))
				.concat({ name: 'custom', enabled: true })
		}, [target_config])
	}

	if (!x.config) return null

	return (
		<div className='flex flex-col'>
			<Tab {...props_tab} />
			<Form />
		</div>
	)
}

export default memo(Index)

export * from './providers'
export * from './types'
