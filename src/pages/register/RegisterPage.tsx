import styles from './RegisterPage.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Navigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useState } from 'react'
import { register } from '../../services/actions/user'
import { ROUTES } from '../../utils/app-routes'
import { ProfileForm } from '../../utils/types/common'
import { useDispatch, useSelector } from '../../utils/types/hooks'
import { getUserStore } from '../../services/store/selectors'

export function RegisterPage () {
  const { isAuthenticated } = useSelector(getUserStore)
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState<ProfileForm>({
    name: '',
    email: '',
    password: ''
  })

  if (isAuthenticated) {
    return (<Navigate to={ROUTES.BASE} replace />)
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(register(formValues))
  }

  return (
    <div className={styles.registerForm__container}>
      <h2 className='text text_center text_type_main-medium mb-6'>Регистрация</h2>
      <form className={`${styles.registerForm__form} mb-20`} onSubmit={submit}>
        <Input name='name' placeholder='Имя' value={formValues.name} onChange={onInputChange} />
        <EmailInput name='email' value={formValues.email} onChange={onInputChange} />
        <PasswordInput name='password' value={formValues.password} onChange={onInputChange} />
        <Button htmlType='submit' type='primary'>Зарегистрироваться</Button>
      </form>
      <p className='text text_center text_type_main-default text_color_inactive'>
        Уже зарегистрированы? <Link to={ROUTES.LOGIN} className={styles.registerForm__link}>Войти</Link>
      </p>
    </div>
  )
}