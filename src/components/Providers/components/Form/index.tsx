import { useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepEqual } from 'fast-equals'
import { useForm } from 'react-hook-form'

import { copy, memo } from '@/utils'
import { ClockClockwiseIcon, EyeClosedIcon, PlusIcon } from '@phosphor-icons/react'

import APIKey from './APIKey'
import BaseUrl from './BaseUrl'
import CustomFields from './CustomFields'
import Models from './Models'

import styles from './index.module.css'

import type { IPropsForm, SpecialProvider } from '../../types'

const Index = (props: IPropsForm) => {
	const { locales, provider, test, current_model, onTest, onProviderChange, onChangeCurrentModel } = props
	const { api_key, base_url, models } = provider
	const { control, formState, getValues, setValue, register } = useForm<IPropsForm['provider']>({
		values: provider
	})

	const onChange = useMemoizedFn(() => {
		const values = copy(getValues())

		if (deepEqual(values, provider)) return

		onProviderChange(values)
	})

	useEffect(() => {
		onChange()
	}, [formState.isDirty])

	return (
		<form className='flex flex-col w-full gap-5'>
			<APIKey {...{ api_key, test, onTest, register }} />
			<BaseUrl {...{ base_url, register }} />
			<CustomFields custom_fields={(provider as SpecialProvider).custom_fields} register={register} />
			<div className='flex flex-col gap-2.5'>
				<span className={`${styles.label}`}>Models</span>
				<Models
					locales_desc={locales.desc}
					{...{ current_model, models, control, register, setValue, onChangeCurrentModel }}
				/>
			</div>
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
						<button className='rounded-2xl px-2.5 py-1.5 btn' type='button'>
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
		</form>
	)
}

export default memo(Index)
