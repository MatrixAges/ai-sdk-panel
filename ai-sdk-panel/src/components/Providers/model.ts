import { proxy } from 'valtio'

export class Model {
	count = 1

	init() {}

	on() {}

	off() {}
}

export default proxy(new Model())
