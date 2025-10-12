import 'react'

import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'react' {
	interface CSSProperties {
		[key: string]: any
	}

	interface HTMLAttributes<T> extends AttributifyAttributes {}
}
