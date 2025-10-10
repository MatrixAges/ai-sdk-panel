import { useMemo } from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import { memo } from '@/utils'

import Item from './Item'

import type { IPropsTab, ProvidersLocales } from '../../types'

const Index = (props: IPropsTab) => {
	const { locales, tab = { type: 'tab', layout: 'between' }, items, current, onChangeCurrent } = props

	const { scroller, container } = useMemo(() => {
		const styles = { scroller: '', container: '' }

		if (tab.type === 'tab') {
			styles['scroller'] += ' max-w-full'

			if (tab.layout === 'scroll') {
				styles['scroller'] += ' overflow-scroll no-scrollbar'
			} else {
				styles['container'] += ' w-full justify-between'
			}
		} else {
			styles['scroller'] = 'max-h-full'
			styles['container'] = 'flex-col gap-4'
		}

		return styles
	}, [tab])

	const Items = items.map(item => (
		<Item
			display_name={locales[item.name as keyof ProvidersLocales['providers']]}
			active={current === item.name}
			{...{ item, onChangeCurrent }}
			key={item.name}
		/>
	))

	return (
		<div className={`flex w-full ${scroller}`}>
			<div className={`flex ${container}`}>
				{tab.type === 'tab' && tab.layout === 'scroll' ? (
					<ScrollMenu wrapperClassName='w-full' scrollContainerClassName='gap-10'>
						{Items}
					</ScrollMenu>
				) : (
					Items
				)}
			</div>
		</div>
	)
}

export default memo(Index)
