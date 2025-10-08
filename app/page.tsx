'use client'

import { preset_providers, Providers } from '@matrixages/ai-sdk-panel'

import type { IPropsProviders } from '@matrixages/ai-sdk-panel'

const Index = () => {
	const props_providers: IPropsProviders = {
		config: { providers: preset_providers }
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<Providers {...props_providers} />
		</div>
	)
}

export default Index
