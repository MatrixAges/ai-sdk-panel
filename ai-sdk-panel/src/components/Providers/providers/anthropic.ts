import type { PresetProvider } from '../types'

export default {
	name: 'anthropic',
	enabled: true,
	api_key: '',
	models: [
		{
			enabled: true,
			id: 'claude-4-opus-20250514',
			name: 'Claude 4 Opus',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'claude-4-sonnet-20250514',
			name: 'Claude 4 Sonnet',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'claude-4-haiku-20250514',
			name: 'Claude 4 Haiku',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'claude-3-opus-20240229',
			name: 'Claude 3 Opus',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'claude-3-sonnet-20240229',
			name: 'Claude 3 Sonnet',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'claude-3-haiku-20240307',
			name: 'Claude 3 Haiku',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'claude-2.1',
			name: 'Claude 2.1',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true
			}
		},
		{
			enabled: true,
			id: 'claude-instant-1.2',
			name: 'Claude Instant 1.2',
			features: {
				function_calling: true,
				structured_output: true,
				reasoning: true,
				reasoning_optional: true,
				web_search: true
			}
		}
	]
} as PresetProvider
