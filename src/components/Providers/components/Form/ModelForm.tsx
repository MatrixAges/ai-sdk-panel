import { AutoLabel } from '@/components'
import { memo } from '@/utils'

import type { IPropsFormModelForm } from '../../types'

const Index = (props: IPropsFormModelForm) => {
	const { index, item, register } = props
	const { name, id } = item

	return (
		<div className='grid grid-cols-2'>
			<AutoLabel label='model ID' valued={id !== ''}>
				<input
					className={`
						w-full h-full
						leading-none
						outline-none
						placeholder:text-soft disabled:text-gray
					`}
					placeholder='Input model ID'
					disabled
					{...register(`models.${index}.id`)}
				/>
			</AutoLabel>
			<AutoLabel label='model name' valued={name !== ''}>
				<input
					className={`
						w-full h-full
						leading-none
						outline-none
						placeholder:text-soft
					`}
					placeholder='Input model name'
					{...register(`models.${index}.name`)}
				/>
			</AutoLabel>
			<AutoLabel className='border-r-0 col-span-2' label='model desc' valued={name !== ''}>
				<input
					className={`
						w-full h-full
						leading-none
						outline-none
						placeholder:text-soft
					`}
					placeholder='Input model desc'
					{...register(`models.${index}.desc`)}
				/>
			</AutoLabel>
		</div>
	)
}

export default memo(Index)
