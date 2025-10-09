import { useMemoizedFn } from 'ahooks'
import cx from 'classix'

import { ProviderIcon } from '@/components'
import { useScrollToItem } from '@/hooks'

import type { IPropsTabItem } from '../../types'

const Index = (props: IPropsTabItem) => {
	const { item, display_name, active, onChangeCurrent } = props

	useScrollToItem(item.name, active)

	const onClick = useMemoizedFn(() => onChangeCurrent(item.name))

	return (
		<div
			className={cx(
				'flex flex-col items-center gap-3 text-gray-400 hover:text-gray-500 active:scale-95 select-none cursor-pointer transition-[colors,scale] duration-150',
				active && '!text-black'
			)}
			onClick={onClick}
		>
			<span className='flex justify-center items-center text-xl'>
				<ProviderIcon name={item.name} />
			</span>
			<span className='text-[13px]'>{display_name}</span>
		</div>
	)
}

export default Index
