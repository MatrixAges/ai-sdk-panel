import { memo } from '@/utils'
import { WifiHighIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsForm } from '../../types'

const Index = (props: IPropsForm) => {
	const { provider } = props

	return (
		<div className='flex flex-col w-full gap-5'>
			{provider?.api_key !== undefined && (
				<div className='flex flex-col gap-2'>
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
			{provider?.base_url !== undefined && (
				<div className='flex flex-col gap-2'>
					<span className={`${styles.label}`}>Base URL</span>
					<input
						placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
						defaultValue={provider.base_url}
						className={`${styles.input_wrap} h-14 ${styles.input}`}
					/>
				</div>
			)}
		</div>
	)
}

export default memo(Index)
