import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, AnyAction } from 'redux'
import { store } from '../../services/store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type NextThunkAction = ThunkAction<void, RootState, unknown, Action<string>>

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
export const useDispatch = dispatchHook<AppDispatch>

