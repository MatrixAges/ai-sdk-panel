import { useEffect, useMemo, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepEqual } from 'fast-equals'
import { useFieldArray, useForm } from 'react-hook-form'
import { deepClone } from 'valtio/utils'

import { Controller, Show, Switch } from '@/components'
import { all_providers } from '@/libs'
import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'
import { ClockClockwiseIcon, EyeClosedIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'

import APIKey from './APIKey'
import BaseUrl from './BaseUrl'
import CustomFields from './CustomFields'
import ModelForm from './ModelForm'
import Models from './Models'

import type { DragEndEvent } from '@dnd-kit/core'
import type { IPropsForm, Model, SpecialProvider } from '../../types'

const Index = (props: IPropsForm) => {
	const {
		locales,
		locales_custom_fields,
		provider,
		test,
		current_model,
		adding_model,
		custom,
		onTest,
		onChangeProvider,
		download,
		upload,
		onChangeCurrentModel,
		toggleAddingModel,
		onDisableProvider,
		onRemoveProvider
	} = props

	const { name, api_key, base_url } = provider

	const [error, setError] = useState('')

	const { control, formState, getValues, setValue, register } = useForm<IPropsForm['provider']>({
		values: provider
	})

	const { fields, prepend, remove, move } = useFieldArray({
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

		onChangeProvider(deepClone(values))
	})

	useEffect(() => {
		if (formState.isDirty) onChange()
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

			return setError(locales.error.id_required)
		}

		if (target_fields.find(item => item.id === values['id'])) {
			setFocus('id')

			return setError(locales.error.id_exsit)
		}

		if (!values['name']) {
			setFocus('name')

			return setError(locales.error.name_required)
		}

		prepend({ ...values, enabled: true, features: values.features || {} })

		onCancel()
	})

	const resetModels = useMemoizedFn(() => {
		const target_provider = all_providers.find(item => item.name === name)

		if (!target_provider) return

		setValue('models', target_provider.models, { shouldDirty: true })
	})

	const onDragModel = useMemoizedFn((args: DragEndEvent) => {
		const { active, over } = args

		if (!over?.id || active.id === over.id) return

		const active_index = target_fields.findIndex(item => item.id === active.id)
		const over_index = target_fields.findIndex(item => item.id === over.id)

		move(active_index, over_index)
	})

	return (
		<div className='flex flex-col w-full gap-5'>
			<form className='flex flex-col w-full gap-5'>
				{custom && (
					<div
						className='
							flex items-center justify-between
							pb-2
							text-sm
							border-b border-border-gray
							capitalize
						'
					>
						<span>{name}</span>
						<div className='flex items-center gap-3'>
							<button
								className='p-1.5 rounded-2xl btn'
								type='button'
								onClick={onRemoveProvider}
							>
								<TrashIcon className='text-base' />
							</button>
							<Controller name='enabled' control={control}>
								<Switch />
							</Controller>
						</div>
					</div>
				)}
				<APIKey title={locales.api_key} {...{ api_key, custom, test, onTest, register }} />
				<BaseUrl title={locales.base_url} {...{ base_url, custom, register }} />
				<CustomFields
					locales_custom_fields={locales_custom_fields}
					custom_fields={(provider as SpecialProvider).custom_fields}
					register={register}
				/>
				<div className='flex flex-col gap-2.5'>
					<div className='flex justify-between items-center'>
						<span className={`${styles.label}`}>{locales.models}</span>
						{custom && (
							<button
								className='px-1.5 py-0.5 text-xsm rounded-2xl btn'
								type='button'
								onClick={toggleAddingModel}
							>
								<PlusIcon className='text-sm' />
								{locales.add_model}
							</button>
						)}
					</div>
					<Models
						models={target_fields}
						{...{
							locales,
							current_model,
							control,
							custom,
							register,
							remove,
							onChangeCurrentModel,
							onDragModel
						}}
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
							{locales.add_model}
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
								className='px-1.5 py-0.5 rounded-2xl btn'
								type='button'
								onClick={onCancel}
							>
								{locales.cancel}
							</button>
							<button className='px-1.5 py-0.5 rounded-2xl btn' type='submit'>
								{locales.submit}
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
							locales_model_form={locales.model_form}
							locales_features={locales.features}
							control={control_model}
							adding_model
							register={register_model}
						/>
					</div>
				</form>
			</Show>
			{!custom && (
				<div className='flex flex-col gap-2.5'>
					<span className={`${styles.label}`}>{locales.actions}</span>
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
								className='px-2.5 py-1.5 rounded-2xl btn'
								type='button'
								onClick={toggleAddingModel}
							>
								<PlusIcon className='text-sm' />
								{locales.add_model}
							</button>
							<button
								className='px-2.5 py-1.5 rounded-2xl btn'
								type='button'
								onClick={resetModels}
							>
								<ClockClockwiseIcon className='text-sm' />
								{locales.reset_model}
							</button>
							<button
								className='px-2.5 py-1.5 rounded-2xl btn'
								type='button'
								onClick={download}
							>
								<ClockClockwiseIcon className='text-sm' />
								{locales.export_config}
							</button>
							<button
								className='px-2.5 py-1.5 rounded-2xl btn'
								type='button'
								onClick={upload}
							>
								<ClockClockwiseIcon className='text-sm' />
								{locales.import_config}
							</button>
						</div>
						<button
							className='px-2.5 py-1.5 text-rose-400 rounded-2xl btn'
							onClick={onDisableProvider}
						>
							<EyeClosedIcon className='text-sm' />
							{locales.disable_provider}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(Index)
