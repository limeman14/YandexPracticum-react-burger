import React, { useEffect } from 'react'
import styles from './App.module.css'
import { AppHeader } from '../app-header/AppHeader'
import { fetchIngredients, removeIngredientFromModal } from '../../services/actions/burger'
import './globalStyles.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ConstructorPage } from '../../pages/constructor/ConstructorPage'
import { LoginPage } from '../../pages/login/LoginPage'
import { RegisterPage } from '../../pages/register/RegisterPage'
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPasswordPage'
import { ResetPasswordPage } from '../../pages/reset-password/ResetPasswordPage'
import { ProtectedRoute } from '../hoc/ProtectedRoute'
import { ProfilePage } from '../../pages/profile/ProfilePage'
import { getUser } from '../../services/actions/user'
import { IngredientDetailsPage } from '../../pages/ingredient-details/IngredientDetailsPage'
import { NotFoundPage } from '../../pages/not-found/NotFoundPage'
import { Modal } from '../modal/Modal'
import { IngredientDetails } from '../constructor/burger-ingredients/ingredient-details/IngredientDetails'
import { ROUTES } from '../../utils/app-routes'
import { getCookie } from '../../utils/cookies'
import { useDispatch, useSelector } from '../../utils/types/hooks'
import { OrderFeedPage } from '../../pages/order-feed/OrderFeedPage'
import { removeOrderInfoFromModal } from '../../services/actions/order-info-modal'
import { OrderFullInfo } from '../order-full-info/OrderFullInfo'

function App () {
  const { ingredientsRequest, ingredientsError } = useSelector((store) => store.burgerIngredients)
  const { getUserRequest } = useSelector((store) => store.user)
  const currentOrder = useSelector(store => store.orderModal.current)
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleIngredientModalClose = () => {
    navigate(-1)
    dispatch(removeIngredientFromModal())
  }

  const handleOrderModalClose = () => {
    navigate(-1)
    dispatch(removeOrderInfoFromModal())
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
        <Route path={ROUTES.LOGIN} element={<LoginPage />}/>
        <Route path={ROUTES.REGISTER} element={<RegisterPage />}/>
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />}/>
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />}/>
        <Route path={ROUTES.PROFILE} element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }/>
        <Route path={ROUTES.INGREDIENT_ID} element={<IngredientDetailsPage />}/>
        <Route path={ROUTES.ANY} element={<NotFoundPage />}/>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={ROUTES.INGREDIENT_ID}
            element={
              <Modal closeModal={handleIngredientModalClose} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={ROUTES.ORDER_FEED_ID}
            element={
              <Modal closeModal={handleOrderModalClose} title={`#${currentOrder?.number}`}>
                <OrderFullInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  )
}

export default App
