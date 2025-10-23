import { useDeferredValue, useSyncExternalStore } from 'react'

export default () => {
	const ssr = useSyncExternalStore(
		() => () => {},
		() => false,
		() => true
	)

	const target = useDeferredValue(ssr)

	return target
}
