export default (el: Element, property: string) => {
	return parseFloat(getComputedStyle(el).getPropertyValue(property).replace('px', ''))
}
