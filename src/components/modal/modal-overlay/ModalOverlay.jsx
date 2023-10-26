import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types'

export const ModalOverlay = ({ closeModal, children }) => {
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