import { Locale } from 'antd/lib/locale-provider'

export interface CommonState {
  lang: string
  locale: Locale
  fresh: boolean
}
