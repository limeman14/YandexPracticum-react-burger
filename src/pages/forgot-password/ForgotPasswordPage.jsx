import styles from './ForgotPasswordPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { forgotPassword } from '../../services/actions/user'
import { ROUTES } from '../../utils/app-routes'

export function ForgotPasswordPage () {
  const { isAuthenticated, isPasswordResetting } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  if (isAuthenticated) {
    return (<Navigate to={ROUTES.BASE} replace />)
  }

  if (isPasswordResetting) {
    return (<Navigate to={ROUTES.RESET_PASSWORD} replace />)
  }

  const onInputChange = e => {
    setEmail(e.target.value)
  }

  const submit = e => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  return (
    <div className={styles.forgotPasswordForm__container}>
      <h2 className='text text_center text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={`${styles.forgotPasswordForm__form} mb-20`} onSubmit={submit}>
        <EmailInput name='email' value={email} placeholder='Укажите email' onChange={onInputChange} />
        <Button htmlType='submit' type='primary'>Восстановить</Button>
      </form>
      <p className='text text_center text_type_main-default text_color_inactive'>
        Вспомнили пароль? <Link to={ROUTES.LOGIN} className={styles.forgotPasswordForm__link}>Войти</Link>
      </p>
    </div>
  )
}