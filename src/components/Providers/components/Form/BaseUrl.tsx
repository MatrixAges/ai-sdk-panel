import { memo } from '@/utils'

import styles from './index.module.css'

import type { IPropsFormBaseUrl } from '../../types'

const Index = (props: IPropsFormBaseUrl) => {
	const { base_url, register } = props

	if (base_url === undefined) return

	return (
		<div className='flex flex-col gap-2.5'>
			<span className={`${styles.label}`}>Base URL</span>
			<input
				className={`
					h-14
					border-border-gray
					${styles.input_wrap} ${styles.input}
				`}
				{...register('base_url')}
			/>
		</div>
	)
}

export default memo(Index)
