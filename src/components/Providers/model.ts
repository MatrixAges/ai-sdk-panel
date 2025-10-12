import { proxy } from 'valtio'

import type { Config } from './types'

export class Model {
	config = null as Config | null
	current = ''

	init(config: Config) {
		this.config = config
		this.current = config.providers[0].name
	}
}

export default proxy(new Model())
