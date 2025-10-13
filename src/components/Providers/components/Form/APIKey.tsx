import { useMemo } from 'react'
import { memo } from '@/utils'

import { WifiHighIcon, CheckIcon, XIcon, SpinnerIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsFormAPIKey } from '../../types'

const Index = (props: IPropsFormAPIKey) => {
	const { api_key, test, onTest } = props
	const { loading, res } = test

	const Status = useMemo(() => {
		if (loading) return <SpinnerIcon />
		if (res == null) return <WifiHighIcon />

		return res ? <CheckIcon size={15} weight='bold' /> : <XIcon size={15} weight='bold' />
	}, [loading, res])

	if (api_key === undefined) return

	return (
		<div className='flex flex-col gap-2.5'>
			<span className={`${styles.label}`}>API Key</span>
			<div className={`${styles.input_wrap} border-border-solid h-14`}>
				<input
					placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
					className={`
						h-full
						focus:blur-none
						blur-xs placeholder-shown:!blur-none ${styles.input}
					`}
				/>
				{onTest && (
					<span
						onClick={onTest}
						className={`
							w-8 h-8
							text-xl
							absolute
							rounded-full
							btn right-2 ${loading && 'animate-spin'}
							${res !== null && (res ? 'text-lime-300' : 'text-rose-300')}
						`}
					>
						{Status}
					</span>
				)}
			</div>
		</div>
	)
}

export default memo(Index)
