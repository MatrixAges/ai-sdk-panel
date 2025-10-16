import { useCallback, useRef, useState } from 'react'
import { motion } from 'motion/react'

import { memo } from '@/utils'

import type { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
	className?: string
}

const Index = (props: IProps) => {
	const { children, className } = props
	const [height, setHeight] = useState<number | 'auto'>('auto')
	const ref = useRef<ResizeObserver | null>(null)

	const container_ref = useCallback((node: HTMLDivElement) => {
		if (node !== null) {
			ref.current = new ResizeObserver(entries => {
				const target_height = entries?.[0]?.contentRect?.height

				setHeight(target_height ?? 'auto')
			})

			ref.current.observe(node)
		} else if (ref.current) {
			ref.current.disconnect()
		}
	}, [])

	return (
		<motion.div
			className={`flex flex-col overflow-hidden ${className}`}
			layout='preserve-aspect'
			style={{ height }}
			animate={{ opacity: 1, height, originY: 'top' }}
			transition={{ duration: 0.15 }}
		>
			<div className='flex flex-col' ref={container_ref}>
				{children}
			</div>
		</motion.div>
	)
}

export default memo(Index)
