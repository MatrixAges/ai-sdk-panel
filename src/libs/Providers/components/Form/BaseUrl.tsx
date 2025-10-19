import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'

import type { IPropsFormBaseUrl } from '../../types'

const Index = (props: IPropsFormBaseUrl) => {
	const { base_url, custom, register } = props

	if (base_url === undefined) return

	return (
		<div className='flex flex-col gap-2.5'>
			<span className={`${styles.label}`}>Base URL</span>
			<input
				className={`
					border-border-gray
					${styles.input_wrap} ${styles.input}
					${custom ? 'h-9 !px-3' : 'h-14'}
				`}
				{...register('base_url')}
			/>
		</div>
	)
}

export default memo(Index)
