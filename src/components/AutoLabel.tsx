import { memo } from '@/utils'

import type { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
	label: string
	valued: boolean
	className?: string
}

const Index = (props: IProps) => {
	const { className, children, label, valued } = props

	return (
		<div
			className={`
				w-full h-14
				text-xsm
				border-r border-b border-border-gray
				transition-[border]
				relative
				group
				focus-within:border-b-border-solid-active
				nth-of-type-[2n]:border-r-0 ${valued && 'justify-start'}
				${className}
`}
		>
			<label
				className={`
					flex items-center
					h-4
					text-gray
					transition-[top]
					absolute
					group-focus-within:text-[10px]
					left-0 px-3 top-2 capitalize
					${valued ? 'text-[10px]' : 'group-not-focus-within:top-5'}
`}
			>
				{label}
			</label>
			<div
				className={`
					flex
					w-full h-full
					text-solid
					transition-opacity
					absolute
					pt-4 px-3 left-0 ${!valued && 'group-not-focus-within:opacity-0'}
`}
			>
				{children}
			</div>
		</div>
	)
}

export default memo(Index)
