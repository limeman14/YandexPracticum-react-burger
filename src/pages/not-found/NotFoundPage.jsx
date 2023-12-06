import styles from './NotFoundPage.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/app-routes'

export function NotFoundPage () {
  return (
    <div className={styles.notFoundPage__container}>
      <h1 className='text text_center text_type_digits-large mb-10'>404</h1>
      <p className='text text_type_main-default'>
        Упс, такой страницы нет! <Link className={`${styles.notFoundPage__link} text text_type_main-default`}
                                       to={ROUTES.BASE}>
        На главную
      </Link>
      </p>
    </div>
  )
}