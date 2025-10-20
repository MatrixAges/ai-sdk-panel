import { ProviderIcon, Switch } from '@/components'
import styles from '@/libs/Providers/index.module.css'
import { memo } from '@/utils'

import type { IPropsDisabled } from '../../types'

const Index = (props: IPropsDisabled) => {
	const { locales, items, onEnableProvider } = props

	return (
		<div className='flex flex-col gap-2.5'>
			<div className={styles.label}>Disabled Providers</div>
			{items.length > 0 ? (
				<div
					className='
						flex flex-col
						text-solid
						bg-bg-main
						border border-border-gray
						rounded-2xl
					'
				>
					{items.map(item => (
						<div
							className='
								flex justify-between items-center
								p-4
								border-b border-border-light
								last:border-none
							'
							key={item}
						>
							<div className='flex items-center gap-3 text-xl'>
								<ProviderIcon name={item} />
								<span className='text-sm'>{locales[item as keyof typeof locales]}</span>
							</div>
							<Switch value={false} onChange={() => onEnableProvider(item)} />
						</div>
					))}
				</div>
			) : (
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
					No providers disabled
				</div>
			)}
		</div>
	)
}

export default memo(Index)
