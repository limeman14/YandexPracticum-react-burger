import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredient.module.css'
import { ingredientType } from '../../../../utils/prop-types'
import { useDispatch } from 'react-redux'
import { DECREMENT_INGREDIENT_COUNTER, DELETE_INGREDIENT } from '../../../../services/actions/burger'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export function BurgerIngredient ({ index, ingredient, moveCard }) {
  const dispatch = useDispatch()
  const removeIngredient = () => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: ingredient.dragId
    })
    dispatch({
      type: DECREMENT_INGREDIENT_COUNTER,
      id: ingredient._id
    })
  }

  const ref = useRef()
  const [, drop] = useDrop({
    accept: 'component',
    hover(item, monitor) {
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
      const clientOffset = monitor.getClientOffset()
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
  const preventDefault = (e) => e.preventDefault()

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

BurgerIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: ingredientType.isRequired,
  moveCard: PropTypes.func.isRequired
}