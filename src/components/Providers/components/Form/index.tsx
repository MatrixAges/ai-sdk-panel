import { useMemo } from 'react'
import { memo } from '@/utils'
import {
	WifiHighIcon,
	PlusIcon,
	ClockClockwiseIcon,
	EyeClosedIcon,
	CheckIcon,
	XIcon,
	SpinnerIcon
} from '@phosphor-icons/react'
import styles from './index.module.css'
import { Switch } from '@/components'
import APIKey from './APIKey'

import type { IPropsForm, SpecialProvider } from '../../types'

const Index = (props: IPropsForm) => {
	const { locales, provider, test, onTest } = props
	const { api_key, base_url, models } = provider
	const { loading, res } = test

	const locales_keys = useMemo(() => Object.keys(locales), [locales])

	const custom_fields = (provider as SpecialProvider)?.custom_fields || {}
	const custom_keys = Object.keys(custom_fields)

	return (
		<div className='flex flex-col w-full gap-5'>
			<APIKey {...{ api_key, test, onTest }} />
			{base_url !== undefined && (
				<div className='flex flex-col gap-2.5'>
					<span className={`${styles.label}`}>Base URL</span>
					<input
						placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
						defaultValue={provider.base_url}
						className={`
							h-14
							border-border-gray
							${styles.input_wrap} ${styles.input}
						`}
					/>
				</div>
			)}
			{custom_keys.length > 0 &&
				custom_keys.map(key => (
					<div key={key} className='flex flex-col gap-2.5'>
						<span className={`${styles.label}`}>{key}</span>
						<input
							placeholder={`Input field ${key}`}
							defaultValue={custom_fields[key]}
							className={`
								h-14
								border-border-gray
								${styles.input_wrap} ${styles.input}
							`}
						/>
					</div>
				))}
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
		</div>
	)
}

export default memo(Index)
