import { useLayoutEffect, useMemo, useRef } from 'react'
import { useMemoizedFn } from 'ahooks'

import { Switch } from '@/components'
import { memo } from '@/utils'
import { ClockClockwiseIcon, EyeClosedIcon, PlusIcon } from '@phosphor-icons/react'

import APIKey from './APIKey'
import BaseUrl from './BaseUrl'
import CustomFields from './CustomFields'

import styles from './index.module.css'

import type { IPropsForm, SpecialProvider } from '../../types'

const Index = (props: IPropsForm) => {
	const { locales, provider, test, onTest, onProviderChange } = props
	const { api_key, base_url, models } = provider
	const form = useRef<HTMLFormElement>(null)

	useLayoutEffect(() => {
		form.current!.reset()
	}, [provider])

	const locales_keys = useMemo(() => Object.keys(locales), [locales])

	const onValuesChange = useMemoizedFn(() => {
		const form_data = new FormData(form.current!)
		const data = Object.fromEntries(form_data.entries()) as Partial<IPropsForm['provider']>

		onProviderChange({ ...provider, ...data })
	})

	return (
		<form onChange={onValuesChange} ref={form} className='flex flex-col w-full gap-5'>
			<APIKey {...{ api_key, test, onTest }} />
			<BaseUrl {...{ base_url }} />
			<CustomFields custom_fields={(provider as SpecialProvider).custom_fields} />
			<div className='flex flex-col gap-2.5'>
				<span className={`${styles.label}`}>Models</span>
				<div
					className='
						flex flex-col
						border border-border-gray
						rounded-2xl
						overflow-hidden
					'
				>
					{models?.length ? (
						models?.map(item => (
							<div
								key={item.id}
								className='
									flex justify-between items-center
									p-4
									bg-bg-main
									border-b border-border-light
									transition-colors
									hover:bg-bg-main-hover active:bg-bg-main-active
									select-none cursor-pointer last:border-none
								'
							>
								<div className='flex flex-col gap-0.5'>
									<span className={`${styles.label}`}>{item.name}</span>
									<div className='flex items-center text-xs text-softlight'>
										{item.desc ||
											locales[
												locales_keys.find(i => item.id === i) ||
													locales_keys.find(
														i => item.id.indexOf(i) !== -1
													) ||
													'no_desc'
											]}
									</div>
								</div>
								<Switch />
							</div>
						))
					) : (
						<div
							className='
								flex justify-center
								text-xsm text-soft
								bg-bg-main
								px-4 py-5
							'
						>
							No models added
						</div>
					)}
				</div>
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
						<button className='rounded-2xl px-2.5 py-1.5 btn'>
							<PlusIcon className='text-sm' />
							Add Model
						</button>
						<button className='rounded-2xl px-2.5 py-1.5 btn'>
							<ClockClockwiseIcon className='text-sm' />
							Reset Models
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
