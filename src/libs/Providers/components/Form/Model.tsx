import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'

import { Controller, Switch } from '@/components'
import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'
import { TrashIcon } from '@phosphor-icons/react'

import type { IPropsFormModel } from '../../types'

const Index = (props: IPropsFormModel) => {
	const { index, item, control, locales_desc, desc_keys, custom, editing, onChangeCurrentModel, remove } = props
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

	const onRemove = useMemoizedFn(() => remove(index))

	return (
		<div
			className={`
				flex justify-between items-center
				p-4
				bg-bg-main
				border-b border-border-light
				transition-colors
				hover:bg-bg-main-hover active:bg-bg-main-active
				select-none cursor-pointer last:border-none ${custom && '!p-3'}
			`}
			onClick={onClick}
		>
			<div className='flex flex-col gap-0.5'>
				<span className={`${styles.label} ${name === '' && 'text-gray'}`}>{name || 'Unnamed'}</span>
				<div className='flex items-center text-xs text-softlight'>{target_desc}</div>
			</div>
			<div className='flex items-center gap-3'>
				{editing && (
					<button className='p-1.5 rounded-2xl btn' type='button' onClick={onRemove}>
						<TrashIcon className='text-base' />
					</button>
				)}
				<Controller name={`models.${index}.enabled`} control={control}>
					<Switch />
				</Controller>
			</div>
		</div>
	)
}

export default memo(Index)
