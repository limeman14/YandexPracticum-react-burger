import styles from './NutritionInfoBlock.module.css'
import PropTypes from 'prop-types'

export function NutritionInfoBlock ({ title, value }) {
  return (
    <div className={styles.infoBlock}>
      <span className='text_center text_type_main-small mb-2'>{title}</span>
      <span className='text_center text_type_digits-default'>{value}</span>
    </div>
  )
}

NutritionInfoBlock.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}