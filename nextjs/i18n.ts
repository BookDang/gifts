// Using next-intl package to handle internationalization in Next.js

import { getRequestConfig } from 'next-intl/server'
import { getUserLocale } from '@/services/locale'

export default getRequestConfig(async () => {
  const locale = await getUserLocale()

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
