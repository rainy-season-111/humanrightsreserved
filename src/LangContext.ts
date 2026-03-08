import { createContext, useContext } from 'react'
import type { Lang } from './i18n'

export const LangContext = createContext<Lang>('EN')
export const useLang = () => useContext(LangContext)
