declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.mp3'

declare module '*.css' {
	interface IClassNames {
		[className: string]: string
	}

	const classNames: IClassNames

	export default classNames
}
