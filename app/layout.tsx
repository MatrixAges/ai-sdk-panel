import '@/styles/global.css'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export default ({ children }: PropsWithChildren) => {
	return (
		<html lang='en' data-theme='dark'>
			<head>
				<link id='favicon' rel='icon' type='image/svg+xml' href='logo.svg' />
			</head>
			<body>{children}</body>
		</html>
	)
}

export const metadata: Metadata = {
	title: 'AI SDK Panel',
	description: 'The config panel for AI SDK.'
}
