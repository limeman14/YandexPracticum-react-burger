import styles from './ProfileEditForm.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { updateUser } from '../../../services/actions/user'
import { ProfileForm, ProfileFormEdit } from '../../../utils/types/common'
import { useDispatch, useSelector } from '../../../utils/types/hooks'

const defaultPassword = '******'

export function ProfileEditForm () {
  const { name, email } = useSelector((store) => store.user.user)
  const initialFormState: ProfileForm = {
    name,
    email,
    password: defaultPassword
  }
  const [formValues, setFormValues] = useState<ProfileForm>({ ...initialFormState })
  const [formChanged, setFormChanged] = useState<boolean>(false)
  const [nameInputDisabled, setNameInputDisabled] = useState<boolean>(true)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const onNameInputIconClick = () => {
    setNameInputDisabled(false)
    nameInputRef.current?.focus()
  }
  const onNameInputBlur = () => {
    setNameInputDisabled(true)
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    let newValues = {} as ProfileFormEdit
    (Object.entries(formValues) as [keyof ProfileFormEdit, string][])
      .forEach(([key, value]) => {
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