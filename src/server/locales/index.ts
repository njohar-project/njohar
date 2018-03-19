import { default as IntlMessageFormat } from 'intl-messageformat'
import { Middleware } from 'koa'
import { LANG_KEY } from '../../lib/constants'

export interface IntlMessages {
  'user:invalid-credential': string
  'user:forbid-super-admin-registration': string
}

import en from './en'
import id from './id'

export const locales = { en, id }

function translate(
  locale: keyof typeof locales,
  message: keyof IntlMessages,
  values: Anything
) {
  const msg = new IntlMessageFormat(locales[locale][message], locale)
  return msg.format(values)
}

export const translateMiddleware: Middleware = async (ctx, next) => {
  let language = ctx.cookies.get(LANG_KEY)
  if (!language) {
    language = 'en'
  }

  language = language.substr(0, 2)

  ctx.translate = (key, values) => {
    return translate(language as Anything, key, values)
  }

  await next()
}
