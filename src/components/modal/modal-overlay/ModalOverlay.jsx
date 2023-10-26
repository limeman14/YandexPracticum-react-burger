import styles from './ModalOverlay.module.css'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

export const ModalOverlay = ({ closeModal, children }) => {
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

  return (
    <div onClick={closeModal} className={styles.modalOverlay}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}