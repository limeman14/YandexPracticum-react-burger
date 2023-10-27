import { createPortal } from 'react-dom'
import { ModalOverlay } from './modal-overlay/ModalOverlay'
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const modalDiv = document.getElementById('modal')

export function Modal ({ closeModal, title, children }) {
  useEffect(() => {
    const onEscKeyPressed = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', onEscKeyPressed)

    return () => {
      document.removeEventListener('keydown', onEscKeyPressed)
    }
  }, [closeModal])

  const stopClickPropagation = e => e.stopPropagation()

  return createPortal(
    (
      <ModalOverlay closeModal={closeModal}>
        <div
          className={`${styles.modal__div} pt-10 pr-10 pb-15 pl-10`}
          onClick={stopClickPropagation}
        >
          <div className={styles.modal__header}>
            <h1 className='text text_type_main-large'>{title}</h1>
            <CloseIcon type='primary' onClick={closeModal}/>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalDiv
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}