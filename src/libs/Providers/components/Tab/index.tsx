import { useMemo } from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import { memo } from '@/utils'

import Item from './Item'

import type { IPropsTab, ProvidersLocales } from '../../types'

const Index = (props: IPropsTab) => {
	const { locales, tab, items, current_tab, onChangeCurrentTab } = props

	const { scroller, container } = useMemo(() => {
		const styles = { scroller: '', container: '' }

		styles['scroller'] += ' max-w-full'

		if (tab === 'scroll') {
			styles['scroller'] += ' overflow-scroll no-scrollbar'
		} else {
			styles['container'] += ' w-full justify-between'
		}

		return styles
	}, [tab])

	const Items = items.map((item, index) => (
		<Item
			index={index}
			display_name={locales[item as keyof ProvidersLocales['providers']]}
			active={current_tab === index}
			key={item}
			{...{ item, onChangeCurrentTab }}
		/>
	))

	return (
		<div className={`flex w-full ${scroller}`}>
			<div className={`flex ${container}`}>
				{tab === 'scroll' ? (
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
