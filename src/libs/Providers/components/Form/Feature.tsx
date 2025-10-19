import { memo } from '@/utils'
import {
	BracketsCurlyIcon,
	BrainIcon,
	EyeIcon,
	FileImageIcon,
	GoogleChromeLogoIcon,
	ImagesSquareIcon,
	LinkIcon,
	SortAscendingIcon,
	ToggleRightIcon,
	WaveformIcon,
	WrenchIcon
} from '@phosphor-icons/react'

import type { Icon } from '@phosphor-icons/react'

export const feature_metadata = {
	vision: {
		Icon: EyeIcon,
		col: 'col-span-3'
	},
	voice: {
		Icon: WaveformIcon,
		col: 'col-span-3'
	},
	function_calling: {
		Icon: WrenchIcon
	},
	structured_output: {
		Icon: BracketsCurlyIcon
	},
	reasoning: {
		Icon: BrainIcon
	},
	reasoning_optional: {
		Icon: ToggleRightIcon
	},
	web_search: {
		Icon: GoogleChromeLogoIcon
	},
	image_input: {
		Icon: ImagesSquareIcon
	},
	image_output: {
		Icon: FileImageIcon
	},
	embedding: {
		Icon: LinkIcon
	},
	reranking: {
		Icon: SortAscendingIcon
	}
} as Record<string, { Icon: Icon; col?: string }>

export const feature_keys = Object.keys(feature_metadata)

interface IProps {
	name: string
}

const Index = (props: IProps) => {
	const { name } = props
	const { Icon } = feature_metadata[name]

	return <Icon />
}

export default memo(Index)
