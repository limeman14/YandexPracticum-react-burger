import styles from './ProfileEditForm.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { updateUser } from '../../../services/actions/user'

export function ProfileEditForm () {
  const { name, email } = useSelector(store => store.user.user)
  const defaultPassword = '******'
  const initialFormState = {
    name,
    email,
    password: defaultPassword
  }
  const [formValues, setFormValues] = useState({ ...initialFormState })
  const [formChanged, setFormChanged] = useState(false)
  const [nameInputDisabled, setNameInputDisabled] = useState(true)

  const nameInputRef = useRef()
  const onNameInputIconClick = () => {
    setNameInputDisabled(false)
    nameInputRef.current.focus()
  }
  const onNameInputBlur = () => {
    setNameInputDisabled(true)
  }

  const onInputChange = e => {
    const { target } = e
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
    setFormChanged(true)
  }

  const onCancel = () => {
    setFormValues({ name, email, password: defaultPassword })
    setFormChanged(false)
  }

  const dispatch = useDispatch()
  const onSubmit = e => {
    e.preventDefault()
    const newValues = {}
    Object.entries(formValues).forEach(([ key, value ]) => {
      if (initialFormState[key] !== value) {
        newValues[key] = value
      }
    })
    dispatch(updateUser(newValues))
    setFormChanged(false)
  }

  return (
    <form className={`${styles.editProfileForm__form} ml-15`} onSubmit={onSubmit}>
      <Input
        disabled={nameInputDisabled}
        icon='EditIcon'
        placeholder='Имя'
        name='name'
        onIconClick={onNameInputIconClick}
        onBlur={onNameInputBlur}
        value={formValues.name}
        onChange={onInputChange}
        ref={nameInputRef}
      />
      <EmailInput
        isIcon={true}
        icon='EditIcon'
        placeholder='Логин'
        name='email'
        value={formValues.email}
        onChange={onInputChange}
      />
      <PasswordInput
        icon='EditIcon'
        placeholder='Пароль'
        name='password'
        value={formValues.password}
        onChange={onInputChange}
      />
      {formChanged &&
        <div className={styles.editProfileForm__buttons}>
          <Button htmlType='button' type='secondary' onClick={onCancel}>Отмена</Button>
          <Button htmlType='submit' type='primary'>Сохранить</Button>
        </div>
      }
    </form>
  )
}