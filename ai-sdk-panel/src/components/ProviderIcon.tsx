import { useMemo } from 'react'

import { memo } from '@/utils'
import {
	AlibabaCloud,
	Anthropic,
	Azure,
	Bedrock,
	Cerebras,
	Cohere,
	DeepInfra,
	DeepSeek,
	Fireworks,
	Gemini,
	Grok,
	Groq,
	Hunyuan,
	LmStudio,
	Mistral,
	Ollama,
	OpenAI,
	OpenRouter,
	Perplexity,
	SiliconCloud,
	Together,
	V0,
	Volcengine,
	Zhipu
} from '@lobehub/icons'
import { BoulesIcon, RobotIcon, EyeClosedIcon } from '@phosphor-icons/react'

import type { IconType } from '@lobehub/icons'
import type { Icon } from '@phosphor-icons/react'

export const module_icon = {
	google_gemini: Gemini,
	aliyun_bailian: AlibabaCloud,
	amazon_bedrock: Bedrock,
	anthropic: Anthropic,
	azure_openai: Azure,
	cerebras: Cerebras,
	cohere: Cohere,
	deepinfra: DeepInfra,
	deepseek: DeepSeek,
	fireworks: Fireworks,
	groq: Groq,
	lmstudio: LmStudio,
	mistral: Mistral,
	ollama: Ollama,
	openai: OpenAI,
	openrouter: OpenRouter,
	perplexity: Perplexity,
	siliconflow: SiliconCloud,
	tencent_hunyuan: Hunyuan,
	together: Together,
	vercel: V0,
	volcengine: Volcengine,
	xai: Grok,
	zhipu: Zhipu,
	custom: BoulesIcon,
	disabled: EyeClosedIcon
} as Record<string, IconType | Icon>

interface IProps {
	name: string
	color?: string
	size?: string | number
}

const Index = ({ name, ...props }: IProps) => {
	const Icon = useMemo(() => (name in module_icon ? module_icon[name] : RobotIcon), [name])

	return <Icon {...props}></Icon>
}

export default memo(Index)
