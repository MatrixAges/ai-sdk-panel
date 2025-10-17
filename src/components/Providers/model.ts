import { ref } from 'valtio'
import { deepClone } from 'valtio/utils'

import { downloadFile, uploadFile } from '@/utils'

import type { ArgsInit, Config, IPropsProviders } from './types'

export default class Index {
	config = null as Config | null
	current_tab = 0
	current_model = null as number | null
	test = { loading: false, res: null as boolean | null }
	adding_model = false
	adding_provider = false

	refs = ref({
		timer_test: null as NodeJS.Timeout | null,
		onChange: null as unknown as IPropsProviders['onChange'],
		onTest: null as unknown as IPropsProviders['onTest']
	})

	get provider() {
		return this.config?.providers[this.current_tab]!
	}

	init(args: ArgsInit) {
		const { config, onChange, onTest } = args

		this.config = deepClone(config)

		this.refs.onChange = onChange
		this.refs.onTest = onTest

		this.onProviderChange = this.onProviderChange.bind(this)
		this.download = this.download.bind(this)
		this.onTest = this.onTest.bind(this)
	}

	onProviderChange(v: Index['provider']) {
		this.config!.providers[this.current_tab] = v
	}

	download() {
		downloadFile('ai-sdk-provider.config', JSON.stringify(this.config, null, 6), 'json')
	}

	async onTest() {
		if (this.refs.timer_test) clearTimeout(this.refs.timer_test)

		this.test = { loading: true, res: null }

		const res = await this.refs.onTest!(this.provider)

		this.test = { loading: false, res }

		this.refs.timer_test = setTimeout(() => {
			this.test.res = null
		}, 2400)
	}

	async upload() {}
}
