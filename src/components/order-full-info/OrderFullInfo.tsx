import { useSelector } from '../../utils/types/hooks'

export function OrderFullInfo () {
  const orderInfo = useSelector(store => store.orderModal.current)
  if (orderInfo === null) {
    return null
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, status, ingredients, createdAt} = orderInfo

  return (
    <div>
      {name}
    </div>
  )
}