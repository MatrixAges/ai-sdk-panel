import { useEffect, useMemo, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepEqual } from 'fast-equals'
import { useFieldArray, useForm } from 'react-hook-form'
import { deepClone } from 'valtio/utils'

import { Show } from '@/components'
import { all_providers } from '@/providers'
import { memo } from '@/utils'
import { ClockClockwiseIcon, EyeClosedIcon, PlusIcon } from '@phosphor-icons/react'

import APIKey from './APIKey'
import BaseUrl from './BaseUrl'
import CustomFields from './CustomFields'
import ModelForm from './ModelForm'
import Models from './Models'

import styles from './index.module.css'

import type { IPropsForm, Model, SpecialProvider } from '../../types'

const Index = (props: IPropsForm) => {
	const {
		locales,
		provider,
		test,
		current_model,
		adding_model,
		onTest,
		onProviderChange,
		download,
		upload,
		onChangeCurrentModel,
		toggleAddingModel
	} = props

	const { name, api_key, base_url } = provider

	const [error, setError] = useState('')

	const { control, formState, getValues, setValue, register } = useForm<IPropsForm['provider']>({
		values: provider
	})

	const { fields, prepend, remove } = useFieldArray({
		control,
		name: 'models',
		keyName: '_'
	})

	const target_fields = useMemo(() => {
		return fields.map(item => {
			// @ts-ignore
			delete item['_']

			return item
		})
	}, [fields])

	const { control: control_model, register: register_model, handleSubmit, reset, setFocus } = useForm<Model>()

	const onChange = useMemoizedFn(() => {
		const values = getValues()

		if (deepEqual(values, provider)) return

		onProviderChange(deepClone(values))
	})

	useEffect(() => {
		onChange()
	}, [formState.isDirty])

	const clearError = useMemoizedFn(() => setError(''))

	const onCancel = useMemoizedFn(() => {
		reset()
		setError('')
		toggleAddingModel()
	})

	const onSubmit = useMemoizedFn(values => {
		setTimeout(() => setError(''), 2400)

		if (!values['id']) {
			setFocus('id')

			return setError('Model ID is required')
		}

		if (target_fields.find(item => item.id === values['id'])) {
			setFocus('id')

			return setError('Model ID is exist')
		}

		if (!values['name']) {
			setFocus('name')

			return setError('Model name is required')
		}

		prepend({ ...values, enabled: true, features: values.features || {} })

		setError('')
		toggleAddingModel()
	})

	const resetModels = useMemoizedFn(() => {
		const target_provider = all_providers.find(item => item.name === name)

		if (!target_provider) return

		setValue('models', target_provider.models, { shouldDirty: true })
	})

	return (
		<div className='flex flex-col w-full gap-5'>
			<form className='flex flex-col w-full gap-5'>
				<APIKey {...{ api_key, test, onTest, register }} />
				<BaseUrl {...{ base_url, register }} />
				<CustomFields custom_fields={(provider as SpecialProvider).custom_fields} register={register} />
				<div className='flex flex-col gap-2.5'>
					<span className={`${styles.label}`}>Models</span>
					<Models
						models={target_fields}
						{...{ locales, current_model, control, register, onChangeCurrentModel }}
					/>
				</div>
			</form>
			<Show
				className='overflow-hidden'
				visible={adding_model}
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: 'auto' }}
			>
				<form className='flex flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex justify-between items-center'>
						<div className={`flex items-center gap-3 ${styles.label}`}>
							Add Model
							<Show
								className='
									text-rose-400
									overflow-hidden whitespace-nowrap cursor-pointer
								'
								visible={error !== ''}
								initial={{ opacity: 0, width: 0 }}
								animate={{ opacity: 1, width: 'auto' }}
								onClick={clearError}
							>
								{error}
							</Show>
						</div>
						<div className='flex gap-1 text-xsm'>
							<button
								className='rounded-2xl px-1.5 py-0.5 btn'
								type='button'
								onClick={onCancel}
							>
								Cancel
							</button>
							<button className='rounded-2xl px-1.5 py-0.5 btn' type='submit'>
								Submit
							</button>
						</div>
					</div>
					<div
						className='
							flex flex-col
							text-xsm
							bg-bg-main
							border border-b-2 border-border-gray
							rounded-2xl
						'
					>
						<ModelForm
							locales_features={locales.features}
							control={control_model}
							adding_model
							register={register_model}
						/>
					</div>
				</form>
			</Show>
			<div className='flex flex-col gap-2.5'>
				<span className={`${styles.label}`}>Actions</span>
				<div
					className='
						flex justify-between
						p-3
						text-xsm
						bg-bg-main
						border border-border-gray
						rounded-2xl
						overflow-hidden
					'
				>
					<div className='flex'>
						<button
							className='rounded-2xl px-2.5 py-1.5 btn'
							type='button'
							onClick={toggleAddingModel}
						>
							<PlusIcon className='text-sm' />
							Add Model
						</button>
						<button
							className='rounded-2xl px-2.5 py-1.5 btn'
							type='button'
							onClick={resetModels}
						>
							<ClockClockwiseIcon className='text-sm' />
							Reset Models
						</button>
						<button className='rounded-2xl px-2.5 py-1.5 btn' type='button' onClick={download}>
							<ClockClockwiseIcon className='text-sm' />
							Export Config
						</button>
						<button className='rounded-2xl px-2.5 py-1.5 btn' type='button' onClick={upload}>
							<ClockClockwiseIcon className='text-sm' />
							Import Config
						</button>
					</div>
					<button className='text-rose-400 rounded-2xl px-2.5 py-1.5 btn'>
						<EyeClosedIcon className='text-sm' />
						Disable Provider
					</button>
				</div>
			</div>
		</div>
	)
}

export default memo(Index)
