import styles from './mainLayout.module.css'

export function MainLayout (props) {
  return (
    <main className={styles.mainLayout}>
      {props.children}
    </main>
  )
}
