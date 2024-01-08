import React, { useEffect } from 'react'
import styles from './App.module.css'
import { AppHeader } from '../app-header/AppHeader'
import { fetchIngredients } from '../../services/actions/burger'
import './globalStyles.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ConstructorPage } from '../../pages/constructor/ConstructorPage'
import { LoginPage } from '../../pages/login/LoginPage'
import { RegisterPage } from '../../pages/register/RegisterPage'
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPasswordPage'
import { ResetPasswordPage } from '../../pages/reset-password/ResetPasswordPage'
import { ProtectedRoute } from '../hoc/ProtectedRoute'
import { ProfilePage } from '../../pages/profile/ProfilePage'
import { IngredientDetailsPage } from '../../pages/ingredient-details/IngredientDetailsPage'
import { NotFoundPage } from '../../pages/not-found/NotFoundPage'
import { Modal } from '../modal/Modal'
import { IngredientDetails } from '../constructor/burger-ingredients/ingredient-details/IngredientDetails'
import { ROUTES } from '../../utils/app-routes'
import { getCookie } from '../../utils/cookies'
import { useDispatch, useSelector } from '../../utils/types/hooks'
import { OrderFeedPage } from '../../pages/order-feed/OrderFeedPage'
import { OrderFullInfo } from '../order-full-info/OrderFullInfo'
import { OrderInfoPage } from '../../pages/order-info/OrderInfoPage'
import { ProfileOrdersPage } from '../../pages/profile-orders/ProfileOrdersPage'
import {
  getBurgerIngredients,
  getOrderFeedOrders,
  getOrderModal,
  getProfileOrdersOrders,
  getUserStore
} from '../../services/store/selectors'
import { getUser } from '../../services/actions/user'

function App () {
  const { ingredientsRequest, ingredientsError } = useSelector(getBurgerIngredients)
  const { getUserRequest } = useSelector(getUserStore)
  const { current: currentOrder} = useSelector(getOrderModal)
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleModalClose = () => {
    navigate(-1)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser())
    }
    dispatch(fetchIngredients())
  }, [dispatch])

  if (ingredientsRequest || ingredientsError || getUserRequest) {
    return null
  }

  return (
    <div className={styles.pageContainer}>
      <AppHeader/>
      <Routes location={background || location}>
        <Route path={ROUTES.BASE} element={<ConstructorPage />}/>
        <Route path={ROUTES.ORDERS_FEED} element={<OrderFeedPage />}/>
        <Route path={ROUTES.ORDER_FEED_ID} element={
          <OrderInfoPage />
        }/>
        <Route path={ROUTES.LOGIN} element={<LoginPage />}/>
        <Route path={ROUTES.REGISTER} element={<RegisterPage />}/>
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />}/>
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />}/>
        <Route path={ROUTES.PROFILE} element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }/>
        <Route path={ROUTES.PROFILE_ORDERS} element={
          <ProtectedRoute>
            <ProfileOrdersPage />
          </ProtectedRoute>
        }
        />
        <Route path={ROUTES.PROFILE_ORDER_ID} element={
          <ProtectedRoute>
            <OrderInfoPage />
          </ProtectedRoute>
        }
        />
        <Route path={ROUTES.INGREDIENT_ID} element={<IngredientDetailsPage />}/>
        <Route path={ROUTES.ANY} element={<NotFoundPage />}/>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={ROUTES.INGREDIENT_ID}
            element={
              <Modal closeModal={handleModalClose} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={ROUTES.ORDER_FEED_ID}
            element={
              <Modal closeModal={handleModalClose} title={`#${currentOrder?.number}`}>
                <OrderFullInfo ordersSelector={getOrderFeedOrders}/>
              </Modal>
            }
          />
          <Route
            path={ROUTES.PROFILE_ORDER_ID}
            element={
              <Modal closeModal={handleModalClose} title={`#${currentOrder?.number}`}>
                <OrderFullInfo ordersSelector={getProfileOrdersOrders}/>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  )
}

export default App
