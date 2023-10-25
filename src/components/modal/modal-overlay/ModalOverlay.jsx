import styles from './ModalOverlay.module.css'

export const ModalOverlay = ({ closeModal, children }) => {
  return (<div onClick={closeModal} className={styles.modalOverlay}>{children}</div>)
}