export default {
	providers: {
		openai: 'OpenAI',
		anthropic: 'Anthropic',
		google_gemini: 'Google',
		xai: 'Grok',
		deepseek: 'Deepseek',
		openrouter: 'OpenRouter',
		ollama: 'Ollama',
		cerebras: 'Cerebras',
		cohere: 'Cohere',
		deepinfra: 'Deepinfra',
		fireworks: 'Firworks',
		groq: 'Groq',
		lmstudio: 'LMStudio',
		mistral: 'Mistral',
		perplexity: 'Perplexity',
		siliconflow: 'SiliconFlow',
		together: 'Together',
		vercel: 'Vercel',
		zhipu: 'Zhipu',
		aliyun_bailian: 'Aliyun',
		tencent_hunyuan: 'Tencent',
		volcengine: 'Bytedance',
		azure_openai: 'Azure',
		amazon_bedrock: 'Amazon',
		custom: 'Custom',
		disabled: 'Disabled'
	},
	form: {
		desc: {
			// OpenAI / GPT
			'gpt-5': 'High-performance general-purpose model for coding and multi-domain agent tasks.',
			'gpt-5-mini': 'Faster, lower-cost GPT-5 variant suitable for well-defined tasks.',
			'gpt-5-nano': 'Lightweight GPT-5 variant for resource-constrained scenarios.',
			'gpt-4.1': "OpenAI's powerful general model, suited for conversation and generation.",
			'gpt-4.1-mini': 'Balanced for intelligence, speed, and cost.',
			'gpt-4o': 'Low-latency, multi-modal optimized model focused on interactive experiences.',
			'gpt-4o-mini': 'Faster, more affordable reasoning model.',
			'o4-mini': 'Faster, more affordable reasoning model',
			o3: 'Most powerful reasoning model',

			// Anthropic / Claude

			'claude-sonnet-4-5': 'Our best model for complex agents and coding.',
			'claude-sonnet-4': 'High-performance model.',
			'claude-sonnet-3-7': 'High-performance model with early extended thinking.',
			'claude-opus-4-1': 'Exceptional model for specialized complex tasks.',
			'claude-opus-4': 'Our previous flagship model.',
			'claude-haiku-3.5': 'Our fastest model.',

			// Google Gemini
			'gemini-2.5-pro': "Google's high-capability multimodal model.",
			'gemini-2.5-flash': 'Optimized for speed and interactivity.',
			'gemini-1.5-pro': 'Previous-generation high-quality text understanding model.',
			'gemini-1.5-flash': 'Low-latency variant of Gemini 1.5.',
			'gemini-2.0-flash': 'Suitable for fast reasoning and conversation.',

			// Amazon Bedrock / Nova
			'nova-pro-v1': 'Commercial model for high-performance inference.',
			'nova-lite-v1': 'Lower-cost Nova series variant.',

			// Cohere
			'command-r': 'Model for instruction and retrieval-augmented tasks.',
			'command-r-plus': 'Stronger variant of Command R.',
			'command-a-03-2025': 'Next-generation instruction model.',
			'command-r7b-12-2024': 'Medium-sized efficient model.',
			'command-r-plus-04-2024': 'Historical version of Command R Plus.',

			// Llama / Meta
			'llama-4-maverick-17b': 'Maverick series optimized for performance.',
			'llama-4-scout-17b': 'Balances capability and cost.',
			'llama4-scout': 'High-quality dialogue and reasoning model.',
			'llama3-8b-instruct':
				'Instruction-tuned, suitable for constrained-resource inference and generation.',
			'llama-3.3-70b': 'Another large-scale variant from Meta.',
			'llama3.1-8b': 'Mid-small scale model for quick deployment.',
			'llama3.1-70b': 'Large-scale model for reasoning and generation.',
			'llama3-70b-instruct': 'Instruction-tuned for complex generation and reasoning.',

			// Deepseek / Deepinfra / related
			'deepseek-r1': 'Focused on reasoning and knowledge augmentation.',
			'deepseek-chat': 'Optimized for chat.',
			'deepseek-r1-distill-qwen-32b': 'Distilled, efficient model based on Qwen 32B.',
			'deepseek-r1-distill-llama-70b': 'Distilled large-scale model based on Llama 70B.',

			// Mixtral / Mistral
			'mixtral-8x22b': 'High-performance Mistral-series variant.',
			'mistral-7b': 'Mid-sized general-purpose model for reasoning and generation.',

			// Groq / Meta Llama on Groq
			'llama-4-scout-17b-16e-instruct': 'Groq deployment instance.',

			// Qwen
			'qwen3-32b': 'Large-scale model with strong Chinese support for understanding and generation.',

			// Perplexity / Sonar
			sonar: 'General retrieval and QA model.',
			'sonar-pro': 'Enhanced retrieval and context fusion capabilities.',
			'sonar-reasoning': 'Sonar variant with reasoning capabilities.',

			// Vercel / V0
			'v0-1.5-md': 'Suitable for multimodal tasks.',
			'v0-1.5-lg': 'For higher-quality generation.',
			'v0-1.0-md': 'Earlier V0 series model.',

			// Grok / x.ai
			'grok-4': 'Focused on conversation and code understanding.',
			'grok-3': 'Earlier conversational model.',
			'grok-3-fast': 'Speed-optimized variant.',

			no_desc: 'This model has no description, you can search by yourself.'
		} as Record<string, string>
	}
}
