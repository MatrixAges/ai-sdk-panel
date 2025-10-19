export default <T>(instance: T) => {
	const all_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))

	for (const name of all_methods) {
		const target = (instance as any)[name]

		if (name !== 'constructor' && name !== 'init' && typeof target === 'function') {
			;(instance as any)[name] = target.bind(instance)
		}
	}
}
