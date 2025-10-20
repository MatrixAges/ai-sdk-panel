import { deepmerge } from 'deepmerge-ts'
import { validate } from 'jsonschema'
import { ref } from 'valtio'
import { deepClone } from 'valtio/utils'

import schema from '@/schema.json'
import { autoBind, downloadFile, uploadFile } from '@/utils'

import type { ArgsInit, Config, ConfigProvider, IPropsProviders } from './types'

export default class Index {
	config = null as Config | null
	current_tab = 0
	current_model = null as number | null
	test = { loading: false, res: null as boolean | null }
	adding_model = false
	adding_provider = false
	upload_error = ''

	refs = ref({
		timer_test: null as NodeJS.Timeout | null,
		onChange: null as unknown as IPropsProviders['onChange'],
		onTest: null as unknown as IPropsProviders['onTest']
	})

	get providers() {
		const enabled = [] as Array<ConfigProvider>
		const disabled = [] as Array<string>

		this.config?.providers.forEach(item => {
			if (item.enabled) {
				enabled.push(item)
			} else {
				disabled.push(item.name)
			}
		})

		return { enabled, disabled }
	}

	get provider() {
		return this.providers.enabled?.[this.current_tab]!
	}

	init(args: ArgsInit) {
		const { config, onChange, onTest } = args

		this.config = deepClone(config)

		this.refs.onChange = onChange
		this.refs.onTest = onTest

		autoBind(this)
	}

	onProviderChange(v: Index['provider']) {
		this.providers.enabled![this.current_tab] = v

		this.onChange()
	}

	onToggleProvider() {
		if (this.providers.enabled!.length <= 3) return

		this.providers.enabled![this.current_tab].enabled = false

		if (this.current_tab === this.providers.enabled!.length) {
			this.current_tab = this.current_tab - 1
		}

		this.onChange()
	}

	onEnableProvider(name: string) {
		const index = this.config!.providers.findIndex(item => item.name === name)!

		this.config!.providers[index].enabled = true
		this.current_tab += 1
	}

	onCustomProvidersChange(v: Config['custom_providers']) {
		this.config!.custom_providers = v

		this.onChange()
	}

	onChange() {
		this.refs.onChange(deepClone(this.config!))
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

	async upload() {
		const files = await uploadFile({ accept: '.json' })

		if (!files) return

		const file = await (files as File).text()

		try {
			const json = JSON.parse(file)
			const res = validate(json, schema)

			if (res.valid) {
				this.current_tab = 0
				this.current_model = null
				this.adding_model = false
				this.config = null

				this.config = deepmerge(deepClone(this.config), json)
			}

			if (res.errors.length)
				this.upload_error = res.errors.reduce((total, item, index) => {
					total += `${item.property.replace('instance.', '')} is not correct`

					if (index !== res.errors.length - 1) total += ' | '

					return total
				}, '[Validate error]: ')
		} catch (err) {
			if ((err as Error).message) this.upload_error = '[Upload error]: please check config format.'
		}

		setTimeout(() => {
			this.upload_error = ''
		}, 6000)
	}
}
