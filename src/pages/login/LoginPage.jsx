import styles from './LoginPage.module.css'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/actions/user'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/app-routes'

export function LoginPage () {
  const { isAuthenticated } = useSelector(store => store.user)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const location = useLocation();

  const onInputChange = e => {
    const { target } = e
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const submit = e => {
    e.preventDefault()
    const { email, password } = formValues
    dispatch(login(email, password))
  }

  if (isAuthenticated) {
    return (<Navigate to={location.state?.from || '/'} replace />)
  }

  return (
    <div className={styles.loginForm__container}>
      <h2 className='text text_center text_type_main-medium mb-6'>Вход</h2>
      <form className={`${styles.loginForm__form} mb-20`} onSubmit={submit}>
        <EmailInput name='email' value={formValues.email} onChange={onInputChange} />
        <PasswordInput name='password' value={formValues.password} onChange={onInputChange} />
        <Button htmlType='submit' type='primary'>Войти</Button>
      </form>
      <p className='text text_center text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь? <Link to={ROUTES.REGISTER} className={styles.loginForm__link}>Зарегистрироваться</Link>
      </p>
      <p className='text text_center text_type_main-default text_color_inactive'>
        Забыли пароль? <Link to={ROUTES.FORGOT_PASSWORD} className={styles.loginForm__link}>Восстановить пароль</Link>
      </p>
    </div>
  )
}