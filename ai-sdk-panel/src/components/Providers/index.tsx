import { useMemoizedFn } from 'ahooks'
import { useProxy } from 'valtio/utils'

import { memo } from '@/utils'

import model from './model'

const Index = () => {
	const x = useProxy(model)

	const onClick = useMemoizedFn(() => {})

	return (
		<div className='flex text-asp-gray-700 bg-asp-gray-50' onClick={onClick}>
			providers-panel {x.count}
		</div>
	)
}

export default memo(Index)
