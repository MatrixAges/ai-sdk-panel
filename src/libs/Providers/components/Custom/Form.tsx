import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { useForm } from 'react-hook-form'

import { AutoLabel, Show } from '@/components'
import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'

import type { IPropsCustomForm, Provider } from '../../types'

const Index = (props: IPropsCustomForm) => {
	const { toggle, checkExist, onAddProvider } = props
	const [error, setError] = useState('')

	const { register, handleSubmit, reset } = useForm<Provider>({})

	const clearError = useMemoizedFn(() => setError(''))

	const onCancel = useMemoizedFn(() => {
		reset()
		setError('')
		toggle()
	})

	const onSubmit = useMemoizedFn((values: Provider) => {
		if (checkExist(values.name)) {
			setTimeout(() => setError(''), 2400)

			return setError(`Provider '${values.name}' has exist`)
		}

		onAddProvider(values)
	})

	return (
		<form className='flex flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)}>
			<div className='flex justify-between items-center'>
				<div className={`flex items-center gap-3 ${styles.label}`}>
					Add Provider
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
					<button className='px-1.5 py-0.5 rounded-2xl btn' type='button' onClick={onCancel}>
						Cancel
					</button>
					<button className='px-1.5 py-0.5 rounded-2xl btn' type='submit'>
						Submit
					</button>
				</div>
			</div>
			<div
				className='
					flex flex-col
					text-xsm
					bg-bg-main
					border border-border-gray
					rounded-2xl
					overflow-hidden
				'
			>
				<AutoLabel label='provider name' valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder='Input provider name'
						required
						{...register('name')}
					/>
				</AutoLabel>
				<AutoLabel label='base URL' valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder='Input base URL'
						required
						{...register('base_url')}
					/>
				</AutoLabel>
				<AutoLabel label='api key' valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder='Input api key'
						{...register('api_key')}
					/>
				</AutoLabel>
				<AutoLabel className='border-b-0' label='headers (optional)' valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder='{"x-custom-header":"value"}'
						{...register('headers')}
					/>
				</AutoLabel>
			</div>
		</form>
	)
}

export default memo(Index)
