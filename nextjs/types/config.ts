export const locales = ['en', 'vn'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
