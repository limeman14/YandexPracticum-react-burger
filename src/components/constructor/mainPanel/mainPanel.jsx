import styles from './mainPanel.module.css';

export function MainPanel(props) {
  return (
    <section className={`text_color_primary text_type_main-default ${styles.mainPanel}`}>
      {props.children}
    </section>
  )
}