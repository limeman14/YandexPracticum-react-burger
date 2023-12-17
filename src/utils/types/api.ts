import { Ingredient } from './common'

export type ServerResponse<T> = {
  readonly success: boolean
} & T

export type GetIngredientsResponse = ServerResponse<{
  readonly data: Ingredient[]
}>

export type CreateOrderResponse = ServerResponse<{
  readonly order: { readonly number: number }
}>

export type UserInfo = {
  readonly name: string
  readonly email: string
}
type TokensInfo = {
  readonly accessToken: string,
  readonly refreshToken: string
}
export type LoginResponse = ServerResponse<{ readonly user: UserInfo } & TokensInfo>
export type TokensInfoResponse = ServerResponse<TokensInfo>
export type UserInfoResponse = ServerResponse<{ readonly user: UserInfo }>
export type RegisterResponse = LoginResponse