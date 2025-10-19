import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'

import type { IPropsFormCustomFields } from '../../types'

const Index = (props: IPropsFormCustomFields) => {
	const { custom_fields, register } = props

	const fields = custom_fields || {}
	const keys = Object.keys(fields)

	if (!keys.length) return

	return keys.map(key => (
		<div key={key} className='flex flex-col gap-2.5'>
			<span className={`${styles.label}`}>{key}</span>
			<input
				className={`
					h-14
					border-border-gray
					${styles.input_wrap} ${styles.input}
				`}
				placeholder={`Input field ${key}`}
				{...register(`custom_fields.${key}`)}
			/>
		</div>
	))
}

export default memo(Index)
