import styles from './OrderTotal.module.css'

interface OrderTotalProps {
  value: number
  title: string
}

export function OrderTotal ({ value, title }: OrderTotalProps) {
  return (
    <div className={styles.orderTotal__div}>
      <h3 className='text text_type_main-medium'>{title}</h3>
      <span className={`${styles.orderTotal__value} text text_type_digits-large`}>{value}</span>
    </div>
  )
}