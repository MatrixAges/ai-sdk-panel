import '@/styles/global.css'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export default ({ children }: PropsWithChildren) => {
	return (
		<html lang='en'>
			<head>
				<link id='favicon' rel='icon' type='image/svg+xml' href='logo.svg' />
			</head>
			<body className='font-sans antialiased'>{children}</body>
		</html>
	)
}

export const metadata: Metadata = {
	title: 'AI SDK Panel',
	description: 'The config panel for AI SDK.'
}
