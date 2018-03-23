import { Modal } from 'antd'
// tslint:disable-next-line:no-implicit-dependencies
import * as moment from 'moment'
import { Reducer } from 'redux'
import { LANG_KEY } from '../../../lib/constants'
import { CookieUtil } from '../../lib'
import { CommonState } from './state'

import en = require('antd/lib/locale-provider/en_US')

export const SET_ERROR = 'SET_ERROR'
export const SET_LANG = 'SET_LANG'
export const SET_FRESH = 'SET_FRESH'

const initialState: CommonState = {
  lang: 'en-US',
  // tslint:disable-next-line:no-any
  locale: en as any,
  fresh: false
}

export const commonReducers: Reducer<{}> = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      const err: Error & Error[] & GqlError = action.payload
      let message = ''

      if (err.graphQLErrors) {
        message = err.graphQLErrors[0].message
      } else if (err instanceof Array) {
        message = err.map(e => e.message).join('\r\n')
      } else {
        // @ts-ignore
        message = err.message
      }

      Modal.error({
        title: 'Oops!',
        content: message
      })
      return state

    case SET_LANG:
      let locale = en
      const lang = action.payload
      switch (lang) {
        default:
          locale = en
      }
      moment.locale(lang)

      CookieUtil.setCookie(LANG_KEY, lang, 365)
      return { ...state, lang, locale }

    case SET_FRESH:
      const fresh = action.payload
      return { ...state, fresh }

    default:
      return state
  }
}
