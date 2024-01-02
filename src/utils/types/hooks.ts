import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux'
import { store } from '../../index'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, AnyAction } from 'redux'

type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type NextThunkAction = ThunkAction<void, RootState, unknown, Action<string>>

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
export const useDispatch = dispatchHook<AppDispatch>

