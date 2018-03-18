import { Store } from 'react-redux'

declare global {
  interface NextProps {
    url: {
      pathname: string
      query: string
      back()
      push(url: string, as?: string)
      pushTo(href: string, as?: string)
      replace(url: string, as?: string)
      replaceTo(href: string, as?: string)
    }
  }  
}
