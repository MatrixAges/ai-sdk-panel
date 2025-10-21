import { useMemoizedFn } from 'ahooks'
import { deepClone } from 'valtio/utils'

import { memo } from '@/utils'

import Feature, { feature_keys, feature_metadata } from './Feature'

import type { ControllerRenderProps } from 'react-hook-form'
import type { IPropsFormModelFormFeatures } from '../../types'

const Index = (props: IPropsFormModelFormFeatures) => {
	const {
		locales_features,
		name,
		value: features = {},
		onChange
	} = props as IPropsFormModelFormFeatures & ControllerRenderProps

	const onItem = useMemoizedFn((key: string) => {
		const target = deepClone(features) || {}

		target[key] = !target[key]

		onChange(target)
	})

	return (
		<div className='grid grid-cols-15'>
			{feature_keys.map(key => (
				<div
					className={`
						flex flex-col justify-center items-center
						h-14
						gap-1
						text-soft text-base
						border-b border-border-gray
						hover:bg-bg-main-hover active:bg-bg-main-active
						select-none cursor-pointer
						${feature_metadata[key].no_border_r ? 'border-r-0' : 'border-r'}
						col-span-3 ${feature_metadata[key].col ?? 'col-span-5'}
						${features[key as keyof typeof features] && 'text-solid'}
						${name === 'features' && 'nth-last-of-type-[-n+3]:border-b-0'}
					`}
					onClick={() => onItem(key)}
					key={key}
				>
					<Feature name={key}></Feature>
					<span className='text-xs capitalize'>
						{locales_features[key as keyof typeof locales_features]}
					</span>
				</div>
			))}
		</div>
	)
}

export default memo(Index)
