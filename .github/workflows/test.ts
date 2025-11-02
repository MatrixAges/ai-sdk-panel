#!/usr/bin/env bun
import { YAML } from 'bun'

import { checkout, setupNode } from '@jlarky/gha-ts/actions'
import { generateWorkflow } from '@jlarky/gha-ts/cli'
import { workflow } from '@jlarky/gha-ts/workflow-types'

const wf = workflow({
	name: 'Testing',
	on: {
		workflow_dispatch: {}
	},
	jobs: {
		Tests: {
			'runs-on': 'ubuntu-latest',
			steps: [
				checkout({ 'fetch-depth': 0 }),
				{ name: 'Setup Pnpm', uses: 'pnpm/action-setup@v4', with: { version: 'latest' } },
				setupNode({ 'node-version': 'latest' }),
				{ name: 'Install Deps', run: 'pnpm i' },
				{ name: 'Install Playwright', run: 'pnpm exec playwright install' },
				{ name: 'Build', run: 'pnpm build' },
				{ name: 'Test', run: 'pnpm run test' }
			]
		}
	}
})

await generateWorkflow(wf, YAML.stringify, import.meta.url)
