import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'

import { memo } from '@/utils'

import Form from '../Form'

import type { IPropsCustomProvider, IPropsForm, Provider } from '../../types'

const Index = (props: IPropsCustomProvider) => {
	const { locales, index, item, update, remove } = props
	const [current_model, setCurrentModel] = useState<number | null>(null)
	const [adding_model, setAddingModel] = useState(false)

	const onChangeProvider = useMemoizedFn((v: Provider) => update(index, v))

	const props_form: IPropsForm = {
		locales,
		provider: item,
		current_model,
		adding_model,
		custom: true,
		onChangeProvider,
		onChangeCurrentModel: useMemoizedFn((v: number) => {
			setCurrentModel(v === current_model ? null : v)
		}),
		toggleAddingModel: useMemoizedFn(() => setAddingModel(!adding_model)),
		onRemoveProvider: useMemoizedFn(() => remove(index))
	}

	return (
		<div
			className='
				flex flex-col
				p-4 gap-5 pt-2
				border border-border-gray
				rounded-2xl
			'
		>
			<Form {...props_form} />
		</div>
	)
}

export default memo(Index)
