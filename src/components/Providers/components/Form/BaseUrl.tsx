import { memo } from '@/utils'

import styles from './index.module.css'

import type { IPropsFormBaseUrl } from '../../types'

const Index = (props: IPropsFormBaseUrl) => {
	const { base_url } = props

	if (base_url === undefined) return

	return (
		<div className='flex flex-col gap-2.5'>
			<span className={`${styles.label}`}>Base URL</span>
			<input
				placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
				defaultValue={base_url}
				name='base_url'
				className={`
					h-14
					border-border-gray
					${styles.input_wrap} ${styles.input}
				`}
			/>
		</div>
	)
}

export default memo(Index)
