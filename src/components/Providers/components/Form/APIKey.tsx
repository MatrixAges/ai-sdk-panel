import { useMemo } from 'react'

import { memo } from '@/utils'
import { CheckIcon, SpinnerIcon, WifiHighIcon, XIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsFormAPIKey } from '../../types'

const Index = (props: IPropsFormAPIKey) => {
	const { api_key, test, onTest, register } = props
	const { loading, res } = test

	const Status = useMemo(() => {
		if (loading) return <SpinnerIcon />
		if (res == null) return <WifiHighIcon />

		return res ? <CheckIcon size={16} weight='bold' /> : <XIcon size={15} weight='bold' />
	}, [loading, res])

	if (api_key === undefined) return

	return (
		<div className='flex flex-col gap-2.5'>
			<span className={`flex ${styles.label}`}>API Key</span>
			<div className={`h-14 border-border-solid ${styles.input_wrap}`}>
				<input
					className={`
						h-full
						focus:blur-none
						blur-xs placeholder-shown:!blur-none ${styles.input}
					`}
					placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
					{...register('api_key')}
				/>
				{onTest && (
					<span
						className={`
							w-8 h-8
							text-xl
							absolute
							rounded-full
							btn right-2 ${loading && 'animate-spin'}
							${res !== null && (res ? 'text-lime-500' : 'text-rose-400')}
						`}
						onClick={onTest}
					>
						{Status}
					</span>
				)}
			</div>
		</div>
	)
}

export default memo(Index)
