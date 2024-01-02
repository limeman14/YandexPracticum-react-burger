import styles from './ModalOverlay.module.css'
import { FC, PropsWithChildren } from 'react'

interface ModalOverlayProps {
  closeModal: () => void
}

export const ModalOverlay: FC<PropsWithChildren<ModalOverlayProps>> = ({ closeModal, children }) => {
  return (
    <div onClick={closeModal} className={styles.modalOverlay}>
      {children}
    </div>
  )
}