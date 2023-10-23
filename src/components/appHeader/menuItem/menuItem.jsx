import styles from './menuItem.module.css'

export function MenuItem ({ icon, text, active }) {
  const textActive = active ? 'text_color_primary' : ''

  return (
    <span className={`mt-4 mb-4 pl-5 pr-5 ${styles.menuItem}`}>
      {icon}
      <span className={`ml-2 ${textActive}`}>{text}</span>
    </span>
  )
}