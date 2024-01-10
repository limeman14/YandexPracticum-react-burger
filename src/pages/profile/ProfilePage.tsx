import styles from './ProfilePage.module.css'
import { ProfileEditForm } from '../../components/profile/edit-form/ProfileEditForm'
import { ProfileNavigation } from '../../components/profile/profile-navigation/ProfileNavigation'

export function ProfilePage() {
  return (
    <div className={styles.profilePage__container}>
      <ProfileNavigation />
      <ProfileEditForm />
    </div>
  )
}