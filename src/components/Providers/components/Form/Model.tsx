import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'

import { Controller, Switch } from '@/components'
import { memo } from '@/utils'

import styles from './index.module.css'

import type { IPropsFormModel } from '../../types'

const Index = (props: IPropsFormModel) => {
	const { index, item, control, locales_desc, desc_keys, onChangeCurrentModel } = props
	const { id, name, desc } = item

	const onClick = useMemoizedFn(() => onChangeCurrentModel(index))

	const target_desc = useMemo(() => {
		if (desc) return desc

		const exact_key = desc_keys.find(i => id === i)

		if (exact_key) return locales_desc[exact_key]

		const relate_key = desc_keys.find(i => id.toLowerCase().indexOf(i) !== -1)

		if (relate_key) return locales_desc[relate_key]

		return locales_desc.no_desc
	}, [desc, locales_desc, desc_keys])

	return (
		<div
			className='
				flex justify-between items-center
				p-4
				bg-bg-main
				border-b border-border-light
				transition-colors
				hover:bg-bg-main-hover active:bg-bg-main-active
				select-none cursor-pointer last:border-none
			'
			onClick={onClick}
		>
			<div className='flex flex-col gap-0.5'>
				<span className={`${styles.label} ${name === '' && 'text-gray'}`}>{name || 'Unnamed'}</span>
				<div className='flex items-center text-xs text-softlight'>{target_desc}</div>
			</div>
			<Controller name={`models.${index}.enabled`} control={control}>
				<Switch />
			</Controller>
		</div>
	)
}

export default memo(Index)
