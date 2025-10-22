import { Fragment, useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'

import { Show } from '@/components'
import { memo } from '@/utils'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Model from './Model'
import ModelForm from './ModelForm'

import type { IPropsFormModels } from '../../types'

const Index = (props: IPropsFormModels) => {
	const { models, control, locales, current_model, custom, register, remove, onChangeCurrentModel, onDragModel } =
		props

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

	const desc_keys = useMemo(() => Object.keys(locales.desc), [locales.desc])

	const onDragStart = useMemoizedFn(() => onChangeCurrentModel(null))

	if (!models?.length)
		return (
			<div
				className='
					flex justify-center
					px-4 py-5
					text-xsm text-soft
					bg-bg-main
					border border-border-gray
					rounded-2xl
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
			<DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragModel}>
				<SortableContext items={models} strategy={verticalListSortingStrategy}>
					{models.map((item, index) => (
						<Fragment key={item.id}>
							<Model
								locales_desc={locales.desc}
								editing={current_model === index}
								{...{
									index,
									item,
									control,
									desc_keys,
									custom,
									onChangeCurrentModel,
									remove
								}}
							/>
							<Show
								className='overflow-hidden'
								visible={current_model !== null && current_model === index}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
							>
								<ModelForm
									locales_features={locales.features}
									{...{ item, index, control, register }}
								/>
							</Show>
						</Fragment>
					))}
				</SortableContext>
			</DndContext>
		</div>
	)
}

export default memo(Index)
