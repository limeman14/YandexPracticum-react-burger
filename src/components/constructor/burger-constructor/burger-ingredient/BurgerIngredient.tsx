import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredient.module.css'
import { useDispatch } from 'react-redux'
import { decrementCounter, removeFromConstructor } from '../../../../services/actions/burger'
import { DragEvent, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Ingredient, WithDragId } from '../../../../utils/types/common'

interface BurgerIngredientProps {
  index: number
  ingredient: WithDragId<Ingredient>
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

export function BurgerIngredient ({ index, ingredient, moveCard }: BurgerIngredientProps) {
  const dispatch = useDispatch<any>()
  const removeIngredient = () => {
    dispatch(removeFromConstructor(ingredient.dragId))
    dispatch(decrementCounter(ingredient._id))
  }

  const ref = useRef<HTMLLIElement>(null)
  const [, drop] = useDrop({
    accept: 'component',
    hover(item: { id: string, index: number}, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()!
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ opacity }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: ingredient._id, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  })

  drag(drop(ref))
  const preventDefault = (e: DragEvent<HTMLLIElement>) => e.preventDefault()

  const { name, image, price } = ingredient

  return (
    <li 
      className={`${styles.mainIngredientCard__li} mb-4`}
      ref={ref}
      style={{opacity}}
      onDrop={preventDefault}
    >
      <DragIcon type='primary'/>
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        extraClass='ml-2'
        handleClose={removeIngredient}
      />
    </li>
  )
}