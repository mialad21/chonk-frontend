import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Chonk Finance',
  description:
    'Earn BNB while being lazy.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Chonk Finance')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Chonk Finance')}`,
      }
    case '/info':
      return {
        title: `${t('Info')} | ${t('Chonk Finance')}`,
        description: 'View statistics for Chonk Finance.',
      }
    default:
      return null
  }
}
