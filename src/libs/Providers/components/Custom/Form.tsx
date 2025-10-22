import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { useForm } from 'react-hook-form'

import { AutoLabel, Show } from '@/components'
import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'

import type { IPropsCustomForm, Provider } from '../../types'

const Index = (props: IPropsCustomForm) => {
	const { locales, toggle, checkExist, onAddProvider } = props
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

			return setError(locales.custom.error.replace('{{name}}', `'${values.name}'`))
		}

		onAddProvider(values)
	})

	return (
		<form className='flex flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)}>
			<div className='flex justify-between items-center'>
				<div className={`flex items-center gap-3 ${styles.label}`}>
					{locales.custom.add_provider}
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
					border border-border-gray
					rounded-2xl
					overflow-hidden
				'
			>
				<AutoLabel label={locales.custom.provider_name} valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder={locales.model_form.input + locales.custom.provider_name}
						required
						{...register('name')}
					/>
				</AutoLabel>
				<AutoLabel label={locales.base_url} valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder={locales.model_form.input + locales.base_url}
						required
						{...register('base_url')}
					/>
				</AutoLabel>
				<AutoLabel label={locales.api_key} valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder={locales.model_form.input + locales.api_key}
						{...register('api_key')}
					/>
				</AutoLabel>
				<AutoLabel className='border-b-0' label={locales.custom.headers} valued>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder={locales.custom.headers_placeholder}
						{...register('headers')}
					/>
				</AutoLabel>
			</div>
		</form>
	)
}

export default memo(Index)
