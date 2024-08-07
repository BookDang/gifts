export const locales = ['en', 'vn'] as const
export type TLocale = (typeof locales)[number]
export const defaultLocale: TLocale = 'en'
