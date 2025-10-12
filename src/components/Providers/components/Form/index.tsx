import { memo } from '@/utils'
import { WifiHighIcon, PlusIcon, ClockClockwiseIcon, EyeClosedIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsForm, SpecialProvider } from '../../types'
import { useMemo } from 'react'

const Index = (props: IPropsForm) => {
	const { locales, provider } = props
	const { api_key, base_url, models } = provider

	const locales_keys = useMemo(() => Object.keys(locales), [locales])

	const custom_fields = (provider as SpecialProvider)?.custom_fields || {}
	const custom_keys = Object.keys(custom_fields)

	return (
		<div className='flex flex-col w-full gap-5'>
			{api_key !== undefined && (
				<div className='flex flex-col gap-2.5'>
					<span className={`${styles.label}`}>API Key</span>
					<div className={`${styles.input_wrap} h-14`}>
						<input
							placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
							className={`
								h-full
								focus:blur-none
								blur-xs placeholder-shown:!blur-none ${styles.input}
							`}
						/>
						<span
							className='
								w-8 h-8
								text-xl
								rounded-full
								btn absolute right-2
							'
						>
							<WifiHighIcon />
						</span>
					</div>
				</div>
			)}
			{base_url !== undefined && (
				<div className='flex flex-col gap-2.5'>
					<span className={`${styles.label}`}>Base URL</span>
					<input
						placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
						defaultValue={provider.base_url}
						className={`${styles.input_wrap} h-14 ${styles.input}`}
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
							className={`${styles.input_wrap} h-14 ${styles.input}`}
						/>
					</div>
				))}
			<div className='flex flex-col gap-2.5'>
				<span className={`${styles.label}`}>Models</span>
				<div
					className='
						flex flex-col
						rounded-2xl border border-border-gray
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
									hover:bg-bg-main-hover
									cursor-pointer last:border-none
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
						rounded-2xl border border-border-gray
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
