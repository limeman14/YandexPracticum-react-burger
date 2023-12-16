import { Ingredient } from "./common-types";

export type ServerResponse<T> = {
  success: boolean
} & T

export type GetIngredientsResponse = ServerResponse<{
  data: Ingredient[]
}>

export type CreateOrderResponse = ServerResponse<{
  order: { number: number }
}>

type UserInfo = {
  name: string
  email: string
}
type TokensInfo = {
  accessToken: string,
  refreshToken: string
}
export type LoginResponse = ServerResponse<{ user: UserInfo } & TokensInfo>
export type TokensInfoResponse = ServerResponse<TokensInfo>
export type UserInfoResponse = ServerResponse<{ user: UserInfo }>
export type RegisterResponse = LoginResponse