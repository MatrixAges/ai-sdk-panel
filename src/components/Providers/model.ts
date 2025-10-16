import { ref } from 'valtio'

import type { ArgsInit, Config, IPropsProviders } from './types'

export default class Index {
	config = null as Config | null
	current_tab = 0
	current_model = null as number | null
	test = { loading: false, res: null as boolean | null }

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

		this.config = config

		this.refs.onChange = onChange
		this.refs.onTest = onTest

		this.onProviderChange = this.onProviderChange.bind(this)
		this.onTest = this.onTest.bind(this)
	}

	onProviderChange(v: Index['provider']) {
		this.config!.providers[this.current_tab] = v
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
}
