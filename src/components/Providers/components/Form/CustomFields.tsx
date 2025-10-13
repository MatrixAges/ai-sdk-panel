import { memo } from '@/utils'

import styles from './index.module.css'

import type { IPropsFormCustomFields } from '../../types'

const Index = (props: IPropsFormCustomFields) => {
	const { custom_fields } = props

	const fields = custom_fields || {}
	const keys = Object.keys(fields)

	if (!keys.length) return

	return keys.map(key => (
		<div key={key} className='flex flex-col gap-2.5'>
			<span className={`${styles.label}`}>{key}</span>
			<input
				placeholder={`Input field ${key}`}
				defaultValue={fields[key]}
				name={key}
				className={`
					h-14
					border-border-gray
					${styles.input_wrap} ${styles.input}
				`}
			/>
		</div>
	))
}

export default memo(Index)
