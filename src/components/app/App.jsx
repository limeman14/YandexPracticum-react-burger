import React, { useEffect } from 'react'
import styles from './App.module.css'
import { AppHeader } from '../app-header/AppHeader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../services/actions/burger'
import './globalStyles.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ConstructorPage } from '../../pages/constructor/ConstructorPage'
import { LoginPage } from '../../pages/login/LoginPage'
import { RegisterPage } from '../../pages/register/RegisterPage'
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPasswordPage'
import { ResetPasswordPage } from '../../pages/reset-password/ResetPasswordPage'
import { ProtectedRoute } from '../hoc/ProtectedRoute'
import { ProfilePage } from '../../pages/profile/ProfilePage'
import { getUser } from '../../services/actions/user'

function App () {
  const { ingredientsRequest, ingredientsError } = useSelector(store => store.burgerIngredients)
  const { getUserRequest } = useSelector(store => store.user)
  const location = useLocation()
  const background = location.state && location.state.background;

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
      </Routes>
    </div>
  )
}

export default App
