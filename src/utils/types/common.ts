export type ProfileFormEdit = {
  name?: string,
  email?: string,
  password?: string
}
export type ProfileForm = Readonly<Required<ProfileFormEdit>>
export type LoginForm = Readonly<Omit<ProfileForm, 'name'>>
export type ResetPasswordForm = {
  readonly password: string,
  readonly token: string
}

export enum IngredientType {
  BUN = 'bun',
  MAIN = 'main',
  SAUCE = 'sauce'
}
export type Ingredient = {
  readonly _id: string
  readonly name: string
  readonly type: IngredientType
  readonly image: string
  readonly image_mobile: string
  readonly image_large: string
  readonly price: number
  readonly proteins: number
  readonly fat: number
  readonly carbohydrates: number
  readonly calories: number
}

export type WithDragId<T> = { readonly dragId: number } & T

export enum OrderStatus {
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done'
}

export type OrderInfo = {
  readonly _id: string
  readonly number: number
  readonly status: OrderStatus
  readonly createdAt: string
  readonly updatedAt: string
  readonly name: string
  ingredients: ReadonlyArray<string>
}