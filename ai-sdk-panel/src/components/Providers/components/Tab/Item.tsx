import { useMemoizedFn } from 'ahooks'

import { ProviderIcon } from '@/components'
import { useScrollToItem } from '@/hooks'

import type { IPropsTabItem } from '../../types'

const Index = (props: IPropsTabItem) => {
	const { item, display_name, active, onChangeCurrent } = props

	useScrollToItem(item.name, active)

	const onClick = useMemoizedFn(() => onChangeCurrent(item.name))

	return (
		<div
			data-active={active}
			onClick={onClick}
			className='
				flex flex-col items-center
				gap-3
				text-std-600/60
				hover:text-gray-600
				group
				data-[active=true]:!text-std-black clickable
			'
		>
			<span className='flex justify-center items-center text-xl'>
				<ProviderIcon name={item.name} />
			</span>
			<span
				className='
					text-xsm text-std-600/40
					group-data-[active=true]:!text-std-black
				'
			>
				{display_name}
			</span>
		</div>
	)
}

export default Index
