'use server'

import { cookies } from 'next/headers'
import { TLocale, defaultLocale } from '@/types/config-locales'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale(): Promise<TLocale> {
  return (cookies().get(COOKIE_NAME)?.value as TLocale) || defaultLocale
}

export async function setUserLocale(locale: TLocale) {
  cookies().set(COOKIE_NAME, locale)
}
