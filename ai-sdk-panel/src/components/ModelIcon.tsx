import { useMemo } from 'react'

import { memo } from '@/utils'
import {
	ChatGLM,
	Claude,
	Cohere,
	DeepSeek,
	Doubao,
	Gemini,
	Grok,
	Hunyuan,
	Meta,
	Mistral,
	Nova,
	OpenAI,
	Perplexity,
	Qwen,
	V0
} from '@lobehub/icons'

export const model_icon_map = {
	claude: Claude.Color,
	gpt: OpenAI,
	o3: OpenAI,
	o4: OpenAI,
	deepseek: DeepSeek.Color,
	gemini: Gemini.Color,
	llama: Meta.Color,
	qwen: Qwen.Color,
	grok: Grok,
	sonar: Perplexity.Color,
	mistral: Mistral.Color,
	mixtral: Mistral,
	pixtral: Mistral.Color,
	ministral: Mistral,
	glm: ChatGLM.Color,
	nova: Nova.Color,
	command: Cohere.Color,
	v0: V0,
	hunyuan: Hunyuan.Color,
	doubao: Doubao.Color,
	amazon: Nova.Color
}

const model_names = Object.keys(model_icon_map)

interface IProps {
	name: string
	color?: string
	size?: string | number
}

const Index = ({ name, ...props }: IProps) => {
	const Icon = useMemo(() => {
		const lower_name = name.toLowerCase()
		const icon_key = model_names.find(key => lower_name.includes(key))

		return model_icon_map[icon_key as keyof typeof model_icon_map] || OpenAI
	}, [name])

	return <Icon {...props}></Icon>
}

export default memo(Index)
