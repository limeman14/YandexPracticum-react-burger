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

function App () {
  const { ingredientsRequest, ingredientsError } = useSelector(store => store.burgerIngredients)
  const location = useLocation()
  const background = location.state && location.state.background;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  if (ingredientsRequest || ingredientsError) {
    return null
  }

  return (
    <div className={styles.pageContainer}>
      <AppHeader/>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </div>
  )
}

export default App
