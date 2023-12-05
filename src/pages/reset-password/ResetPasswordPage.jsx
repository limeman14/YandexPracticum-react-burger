import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import styles from './ResetPasswordPage.module.css'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { resetPassword } from '../../services/actions/user'
import { ROUTES } from '../../utils/app-routes'

export function ResetPasswordPage () {
  const { isAuthenticated, isPasswordResetSuccess, isPasswordResetting } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    password: '',
    token: ''
  })

  if (isAuthenticated) {
    return (<Navigate to={ROUTES.BASE} replace />)
  }

  if (isPasswordResetSuccess) {
    return (<Navigate to={ROUTES.LOGIN} replace />)
  }

  if (!isPasswordResetting) {
    return (<Navigate to={ROUTES.FORGOT_PASSWORD} replace />)
  }

  const onInputChange = e => {
    const { target } = e
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const submit = e => {
    e.preventDefault()
    dispatch(resetPassword(formValues))
  }

  return (
    <div className={styles.resetPasswordForm__container}>
      <h2 className='text text_center text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={`${styles.resetPasswordForm__form} mb-20`} onSubmit={submit}>
        <PasswordInput
          name='password'
          value={formValues.password}
          placeholder='Введите новый пароль'
          onChange={onInputChange}
        />
        <Input name='token' value={formValues.token} placeholder='Введите код из письма' onChange={onInputChange}/>
        <Button htmlType='submit' type='primary'>Сохранить</Button>
      </form>
      <p className='text text_center text_type_main-default text_color_inactive'>
        Вспомнили пароль? <Link to={ROUTES.LOGIN} className={styles.resetPasswordForm__link}>Войти</Link>
      </p>
    </div>
  )
}