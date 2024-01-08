import { AnyAction, Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, RootState } from '../../utils/types/hooks'
import { getCookie } from '../../utils/cookies'
import { getUser } from '../actions/user'

export type WebSocketActions = {
  init: string
  open: string
  message: string
  error: string
  close: string
}

export const createWebSocketMiddleware: (actions: WebSocketActions, url: string, withAuth?: boolean) => Middleware =
  (wsActions, url, withAuth) => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | undefined

    return next => (action: AnyAction) => {
      const { dispatch } = store
      const { type } = action
      const { init, open, message, error, close } = wsActions

      if (type === init && !socket) {
        const tokenQueryParam = withAuth
          ? `?token=${getCookie('accessToken')?.replace('Bearer ', '')?.replace(' path=/', '')}`
          : ''
        socket = new WebSocket(url + tokenQueryParam)
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: open, payload: event })
        }

        socket.onerror = event => {
          dispatch({ type: error, payload: event })
        }

        socket.onmessage = (event: MessageEvent<string>) => {
          const { data } = event
          try {
            const parsedData = JSON.parse(data)
            if (parsedData.message === 'Invalid or missing token') {
              dispatch(getUser())
            }
            dispatch({ type: message, payload: parsedData })
          } catch (e) {
            dispatch({ type: error, payload: event })
          }
        }

        socket.onclose = event => {
          dispatch({ type: close, payload: event })
        }
      }

      if (type === close && socket) {
        socket.close()
        socket = undefined
      }
      
      next(action)
    }
  }
}