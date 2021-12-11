import { Language } from '@pancakeswap/uikit'

export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' }
export const DE: Language = { locale: 'de-DE', language: 'Deutsch', code: 'de' }

export const languages = {
  'en-US': EN,
  'de-DE': DE,
}

export const languageList = Object.values(languages)
