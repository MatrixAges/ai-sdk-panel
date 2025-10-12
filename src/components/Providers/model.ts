import { ref } from 'valtio'

import type { ArgsInit, Config, IPropsProviders } from './types'

export default class Index {
	config = null as Config | null
	current = ''
	test = { loading: false, res: null as boolean | null }
	refs = ref({
		timer_test: null as NodeJS.Timeout | null,
		onChange: null as unknown as IPropsProviders['onChange'],
		onTest: null as unknown as IPropsProviders['onTest']
	})

	get provider() {
		return this.config?.providers.find(item => item.name === this.current)!
	}

	init(args: ArgsInit) {
		const { value, onChange, onTest } = args

		this.config = value
		this.current = value.providers[0].name

		this.refs.onChange = onChange
		this.refs.onTest = onTest

		this.onTest = this.onTest.bind(this)
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
