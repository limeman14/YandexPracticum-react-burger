export const ROUTES = {
  BASE: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  PROFILE_ORDER_ID: '/profile/orders/:id',
  INGREDIENT_ID: '/ingredients/:id',
  ORDERS_FEED: '/feed',
  ORDER_FEED_ID: '/feed/:id',
  ANY: '*'
} as const