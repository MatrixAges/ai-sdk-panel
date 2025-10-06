import { lazy, Suspense, useMemo } from 'react'

import { memo } from '@/utils'

interface IProps {
	name: string
}

const Index = (props: IProps) => {
	const { name } = props

	const Component = useMemo(() => lazy(() => import(`./Panels/${name}`)), [name])

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Component />
		</Suspense>
	)
}

export default memo(Index)
