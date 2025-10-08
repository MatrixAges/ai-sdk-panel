import { proxy } from 'valtio'

import type { Config } from './types'

export class Model {
	config = null as Config | null

	init(config: Config) {
		this.config = config
	}
}

export default proxy(new Model())
