import { ProviderIcon } from '@/components'
import { memo } from '@/utils'

import type { IPropsTab } from '../../types'

const Index = (props: IPropsTab) => {
	const { tab_type, items } = props

	return (
		<div className='flex'>
			<div className='flex'>
				{items.map(item => (
					<div className='flex flex-col items-center' key={item.name}>
						<span className='flex justify-center items-center'>
							<ProviderIcon name={item.name} />
						</span>
						<span>{item.name}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(Index)
