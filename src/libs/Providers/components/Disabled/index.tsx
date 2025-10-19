import { memo } from '@/utils'

import type { IPropsDisabled } from '../../types'

const Index = (props: IPropsDisabled) => {
	const {} = props

	return 'disabled'
}

export default memo(Index)
