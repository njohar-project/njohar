export class CookieUtil {
  static setCookie(name: string, value: string, expInDays: number = 365) {
    if (typeof document === 'undefined') {
      return
    }
    const d = new Date()
    d.setTime(d.getTime() + expInDays * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()
    document.cookie =
      name + '=' + value + ';' + expires + 'HttpOnly;' + ';path=/'
  }

  static deleteCookie(name: string) {
    this.setCookie(name, '', 0)
  }

  static getCookie(cname: string) {
    if (typeof document === 'undefined') {
      return ''
    }
    const name = cname + '='
    const ca = document.cookie.split(';')
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
}
