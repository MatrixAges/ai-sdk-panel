import { useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepEqual } from 'fast-equals'
import { useForm } from 'react-hook-form'
import { deepClone } from 'valtio/utils'

import { Show } from '@/components'
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
		onChangeCurrentModel,
		toggleAddingModel
	} = props

	const { api_key, base_url, models } = provider

	const { control, formState, getValues, register } = useForm<IPropsForm['provider']>({
		values: provider
	})

	const { control: control_model, register: register_model, handleSubmit } = useForm<Model>()

	const onChange = useMemoizedFn(() => {
		const values = getValues()

		if (deepEqual(values, provider)) return

		onProviderChange(deepClone(values))
	})

	useEffect(() => {
		onChange()
	}, [formState.isDirty])

	const onSubmit = useMemoizedFn(values => {
		console.log(values)
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
						locales={locales}
						{...{ current_model, models, control, register, onChangeCurrentModel }}
					/>
				</div>
			</form>
			<Show
				visible={adding_model}
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: 'auto' }}
			>
				<form className='flex flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex justify-between items-center'>
						<span className={`${styles.label}`}>Add Model</span>
						<div className='flex gap-1 text-xsm'>
							<button className='rounded-2xl px-1.5 py-0.5 btn' type='button'>
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
							overflow-hidden
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
						<button className='rounded-2xl px-2.5 py-1.5 btn' type='button'>
							<ClockClockwiseIcon className='text-sm' />
							Reset Models
						</button>
						<button className='rounded-2xl px-2.5 py-1.5 btn' type='button'>
							<ClockClockwiseIcon className='text-sm' />
							Export Config
						</button>
						<button className='rounded-2xl px-2.5 py-1.5 btn' type='button'>
							<ClockClockwiseIcon className='text-sm' />
							Import Config
						</button>
					</div>
					<button className='text-red-400 rounded-2xl px-2.5 py-1.5 btn'>
						<EyeClosedIcon className='text-sm' />
						Disable Provider
					</button>
				</div>
			</div>
		</div>
	)
}

export default memo(Index)
