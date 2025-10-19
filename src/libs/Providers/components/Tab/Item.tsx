import { useMemoizedFn } from 'ahooks'

import { ProviderIcon } from '@/components'
import { useScrollToItem } from '@/hooks'

import type { IPropsTabItem } from '../../types'

const Index = (props: IPropsTabItem) => {
	const { index, item, display_name, active, onChangeCurrentTab } = props

	useScrollToItem(item.name, active)

	const onClick = useMemoizedFn(() => onChangeCurrentTab(index))

	return (
		<div
			data-active={active}
			onClick={onClick}
			className='
				flex flex-col items-center
				gap-3
				text-light
				group
				data-[active=true]:!text-dark
				hover:text-gray-600
				clickable
			'
		>
			<span className='flex justify-center items-center text-xl'>
				<ProviderIcon name={item.name} />
			</span>
			<span
				className='
					text-xsm text-soft
					group-data-[active=true]:!text-dark
				'
			>
				{display_name}
			</span>
		</div>
	)
}

export default Index
