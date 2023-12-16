import styles from './NutritionInfoBlock.module.css'

interface NutritionInfoBlockProps {
  title: string
  value: number
}

export function NutritionInfoBlock ({ title, value }: NutritionInfoBlockProps) {
  return (
    <div className={styles.infoBlock}>
      <span className='text_center text_type_main-small mb-2'>{title}</span>
      <span className='text_center text_type_digits-default'>{value}</span>
    </div>
  )
}