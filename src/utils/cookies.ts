type CookieProperties = { expires?: number | Date | string } & Record<string, any>

export const setCookie = (name: string, value: string, props: CookieProperties = {}) => {
  props = {
    ...props,
    path: '/'
  }

  let exp = props.expires
  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = d
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += ' ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^| )' + name.replace(/([$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}