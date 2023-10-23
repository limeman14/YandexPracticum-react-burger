import { MenuItem } from '../menuItem/menuItem'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './rightSection.module.css'

export function RightSection () {
  return (
    <div className={styles.appHeader__div_right}>
      <MenuItem
        icon={<ProfileIcon type='secondary'/>}
        text='Личный кабинет'
      />
    </div>
  )
}