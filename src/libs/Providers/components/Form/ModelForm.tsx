import { AutoLabel, Controller } from '@/components'
import { memo } from '@/utils'

import { useGlobalState } from '../../context'
import Features from './Features'

import type { UseFormRegister } from 'react-hook-form'
import type { IPropsForm, IPropsFormModelForm, Model } from '../../types'

const Index = (props: IPropsFormModelForm) => {
	const { index = 0, item, control, adding_model, register } = props
	const { name, id, desc, features, fee } = item || {}

	const { locales } = useGlobalState()

	return (
		<div className='flex flex-col'>
			<div className='grid grid-cols-2'>
				<AutoLabel
					className='border-r'
					label={locales.form.model_form.model_id}
					valued={id || adding_model}
				>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft disabled:text-gray
						`}
						placeholder={locales.form.model_form.input + locales.form.model_form.model_id}
						disabled={!adding_model}
						{...(adding_model
							? (register as UseFormRegister<Model>)('id')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.id`
								))}
					/>
				</AutoLabel>
				<AutoLabel label={locales.form.model_form.model_name} valued={name || adding_model}>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder={locales.form.model_form.input + locales.form.model_form.model_name}
						{...(adding_model
							? (register as UseFormRegister<Model>)('name')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.name`
								))}
					/>
				</AutoLabel>
				<AutoLabel
					className='border-r'
					label={locales.form.model_form.output_fee}
					valued={fee?.output || adding_model}
				>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft disabled:text-gray placeholder:capitalize
						`}
						type='number'
						step={0.01}
						placeholder={
							locales.form.model_form.output_fee + locales.form.model_form.per_million
						}
						{...(adding_model
							? (register as UseFormRegister<Model>)('fee.output')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.fee.output`
								))}
					/>
				</AutoLabel>
				<AutoLabel label={locales.form.model_form.input_fee} valued={fee?.input || adding_model}>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft disabled:text-gray placeholder:capitalize
						`}
						type='number'
						step={0.01}
						placeholder={
							locales.form.model_form.input_fee + locales.form.model_form.per_million
						}
						{...(adding_model
							? (register as UseFormRegister<Model>)('fee.input')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.fee.input`
								))}
					/>
				</AutoLabel>
				<AutoLabel
					className='border-r-0 col-span-2'
					label={locales.form.model_form.model_desc}
					valued={desc || adding_model}
				>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder={locales.form.model_form.input + locales.form.model_form.model_desc}
						{...(adding_model
							? (register as UseFormRegister<Model>)('desc')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.desc`
								))}
					/>
				</AutoLabel>
			</div>
			{(features || adding_model) && (
				<Controller name={adding_model ? 'features' : `models.${index}.features`} control={control}>
					<Features />
				</Controller>
			)}
		</div>
	)
}

export default memo(Index)
