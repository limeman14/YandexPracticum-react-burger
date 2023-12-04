import React, { useEffect } from 'react'
import styles from './App.module.css'
import { AppHeader } from '../app-header/AppHeader'
import { useDispatch, useSelector } from 'react-redux'
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

function App () {
  const { ingredientsRequest, ingredientsError } = useSelector(store => store.burgerIngredients)
  const { getUserRequest } = useSelector(store => store.user)
  const { current: isIngredientSetInModal } = useSelector(store => store.ingredientModal)
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background

  const handleIngredientModalClose = () => {
    navigate(-1)
    dispatch(removeIngredientFromModal())
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(fetchIngredients())
  }, [dispatch])

  if (ingredientsRequest || ingredientsError || getUserRequest) {
    return null
  }

  return (
    <div className={styles.pageContainer}>
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
        <Route path='/reset-password' element={<ResetPasswordPage />}/>
        <Route path='/profile' element={
          <ProtectedRoute element={<ProfilePage />} />
        }/>
        <Route path='/ingredients/:id' element={<IngredientDetailsPage />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
      {background && isIngredientSetInModal && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal closeModal={handleIngredientModalClose} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  )
}

export default App
