import { Fragment, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'

import { Show } from '@/components'
import { memo } from '@/utils'

import Model from './Model'
import ModelForm from './ModelForm'

import type { IPropsFormModels } from '../../types'

const Index = (props: IPropsFormModels) => {
	const { models, control, locales_desc, current_model, register, setValue, onChangeCurrentModel } = props

	const desc_keys = useMemo(() => Object.keys(locales_desc), [locales_desc])

	const { fields, append, remove } = useFieldArray({
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

	if (!models?.length || locales_desc.desc)
		return (
			<div
				className='
					flex justify-center
					text-xsm text-soft
					bg-bg-main
					border border-border-gray
					rounded-2xl
					px-4 py-5
				'
			>
				No models added
			</div>
		)

	return (
		<div
			className='
				flex flex-col
				border border-border-gray
				rounded-2xl
				overflow-hidden
			'
		>
			{target_fields.map((item, index) => (
				<Fragment key={item.id}>
					<Model {...{ index, item, control, locales_desc, desc_keys, onChangeCurrentModel }} />
					<Show
						className='overflow-hidden'
						visible={current_model !== null && current_model === index}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
					>
						<ModelForm {...{ item, index, register }} />
					</Show>
				</Fragment>
			))}
		</div>
	)
}

const Test = memo(() => {
	console.log('test')
	return null
})

export default memo(Index)
