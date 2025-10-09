'use client'

import { all_providers, preset_providers, Providers } from '@matrixages/ai-sdk-panel'

import type { IPropsProviders } from '@matrixages/ai-sdk-panel'

const Index = () => {
	const props_providers: IPropsProviders = {
		config: { providers: all_providers },
		tab: { type: 'tab', layout: 'scroll' },
		// config: { providers: preset_providers },
		width: 690
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center bg-amber-50/20'>
			<Providers {...props_providers} />
		</div>
	)
}

export default Index
