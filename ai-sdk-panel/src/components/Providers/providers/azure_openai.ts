import type { PresetProvider } from '../types'

export default {
	name: 'azure_openai',
	enabled: true,
	resourceName: '',
	api_key: '',
	api_version: '2024-10-01-preview',
	models: [
		{
			enabled: true,
			id: 'gpt-4.1',
			name: 'GPT 4.1',
			features: {
				function_calling: true,
				structured_output: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'gpt-4o',
			name: 'GPT 4o',
			features: {
				function_calling: true,
				structured_output: true,
				web_search: true,
				image_input: true
			}
		},
		{
			enabled: true,
			id: 'gpt-3.5-turbo',
			name: 'GPT 3.5 Turbo',
			features: {
				function_calling: true,
				structured_output: true,
				web_search: true
			}
		}
	]
} as PresetProvider
