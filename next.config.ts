import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

import type { NextConfig } from 'next'

const is_dev = process.env.NODE_ENV === 'development'

const config: NextConfig = {
	devIndicators: false,
	outputFileTracingRoot: __dirname
}

export default config

if (is_dev) initOpenNextCloudflareForDev()
