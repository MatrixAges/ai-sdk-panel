import { AutoLabel, Controller } from '@/components'
import { memo } from '@/utils'

import Features from './Features'

import type { UseFormRegister } from 'react-hook-form'
import type { IPropsForm, IPropsFormModelForm, Model } from '../../types'

const Index = (props: IPropsFormModelForm) => {
	const { locales_features, index = 0, item, control, adding_model, register } = props
	const { name, id, desc, features, fee } = item || {}

	return (
		<div className='flex flex-col'>
			<div className='grid grid-cols-2'>
				<AutoLabel className='border-r' label='model ID' valued={id || adding_model}>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft disabled:text-gray
						`}
						placeholder='Input model ID'
						disabled={!adding_model}
						{...(adding_model
							? (register as UseFormRegister<Model>)('id')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.id`
								))}
					/>
				</AutoLabel>
				<AutoLabel label='model name' valued={name || adding_model}>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder='Input model name'
						{...(adding_model
							? (register as UseFormRegister<Model>)('name')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.name`
								))}
					/>
				</AutoLabel>
				<AutoLabel className='border-r' label='output fee' valued={fee?.output || adding_model}>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft disabled:text-gray placeholder:capitalize
						`}
						type='number'
						step={0.01}
						placeholder='output fee (per million)'
						{...(adding_model
							? (register as UseFormRegister<Model>)('fee.output')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.fee.output`
								))}
					/>
				</AutoLabel>
				<AutoLabel label='input fee' valued={fee?.input || adding_model}>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft disabled:text-gray placeholder:capitalize
						`}
						type='number'
						step={0.01}
						placeholder='input fee (per million)'
						{...(adding_model
							? (register as UseFormRegister<Model>)('fee.input')
							: (register as UseFormRegister<IPropsForm['provider']>)(
									`models.${index}.fee.input`
								))}
					/>
				</AutoLabel>
				<AutoLabel className='border-r-0 col-span-2' label='model desc' valued={desc || adding_model}>
					<input
						className={`
							w-full h-full
							leading-none
							outline-none
							placeholder:text-soft
						`}
						placeholder='Input model desc'
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
					<Features locales_features={locales_features} />
				</Controller>
			)}
		</div>
	)
}

export default memo(Index)
