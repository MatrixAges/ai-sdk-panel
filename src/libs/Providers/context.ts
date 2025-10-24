import { createContext, useContext } from 'react'

import type { ExoticComponent } from 'react'
import type { ProvidersLocales } from './types'

export const GlobalContext = createContext<{
	locales: ProvidersLocales
	icons?: Record<string, ExoticComponent<any>>
}>(
	// @ts-ignore
	{}
)

export const GlobalState = GlobalContext.Provider

export const useGlobalState = () => useContext(GlobalContext)
