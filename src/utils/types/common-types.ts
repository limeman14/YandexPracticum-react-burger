export type ProfileFormEdit = {
  name?: string,
  email?: string,
  password?: string
}
export type ProfileForm = Readonly<Required<ProfileFormEdit>>

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