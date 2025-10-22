import { useEffect, useMemo } from 'react'
import { useMemoizedFn, useToggle } from 'ahooks'
import { deepEqual } from 'fast-equals'
import { useFieldArray, useForm } from 'react-hook-form'
import { deepClone } from 'valtio/utils'

import { Show } from '@/components'
import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'
import { PlusIcon } from '@phosphor-icons/react'

import Form from './Form'
import Provider from './Provider'

import type { IPropsCustom, Provider as ProviderType } from '../../types'

const Index = (props: IPropsCustom) => {
	const { locales, custom_providers = [], onChangeCustomProviders } = props
	const [visible, { toggle }] = useToggle()

	const { control, formState, getValues } = useForm<{
		providers: Array<ProviderType>
	}>({
		values: { providers: custom_providers }
	})

	const { fields, prepend, remove, update } = useFieldArray({
		control,
		name: 'providers',
		keyName: '_'
	})

	const target_fields = useMemo(() => {
		return fields.map(item => {
			// @ts-ignore
			delete item['_']

			return item
		})
	}, [fields])

	const checkExist = useMemoizedFn((name: string) => {
		const target = custom_providers.find(item => item.name === name)

		return Boolean(target)
	})

	const onAddProvider = useMemoizedFn((v: ProviderType) => {
		prepend({ ...v, enabled: true, models: [] })
	})

	const onChange = useMemoizedFn(() => {
		const values = getValues()

		if (deepEqual(values, custom_providers)) return

		onChangeCustomProviders(deepClone(values.providers))
	})

	useEffect(() => {
		if (formState.isDirty) onChange()
	}, [formState.isDirty])

	return (
		<div className='flex flex-col gap-5'>
			<div
				className='
					flex items-center justify-between
					p-3
					text-xsm
					bg-bg-main
					border border-border-gray
					rounded-2xl
					overflow-hidden
				'
			>
				<button className='px-2.5 py-1.5 rounded-2xl btn' type='button' onClick={toggle}>
					<PlusIcon className='text-sm' />
					Add Provider
				</button>
				<span className='text-gray'>OpenAI Compatible Provider</span>
			</div>
			<Show
				className='overflow-hidden'
				visible={visible}
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: 'auto' }}
			>
				<Form {...{ toggle, checkExist, onAddProvider }} />
			</Show>
			{target_fields.length > 0 && (
				<div className='flex flex-col w-full gap-2.5'>
					<span className={styles.label}>Providers</span>
					<div className='flex flex-col gap-5'>
						{target_fields.map((item, index) => (
							<Provider {...{ locales, index, item, update, remove }} key={item.name} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(Index)
