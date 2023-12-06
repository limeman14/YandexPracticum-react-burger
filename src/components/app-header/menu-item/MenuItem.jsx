import styles from './MenuItem.module.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export function MenuItem ({ icon, text, active, path = '/' }) {
  const textActive = active ? 'text_color_primary' : ''

  return (
    <Link to={path} className={`mt-4 mb-4 pl-5 pr-5 ${styles.menuItem}`}>
      {icon({ type: active ? 'primary' : 'secondary' })}
      <span className={`ml-2 ${textActive}`}>{text}</span>
    </Link>
  )
}

MenuItem.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
}