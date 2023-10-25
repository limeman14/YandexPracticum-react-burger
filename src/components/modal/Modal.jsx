import {createPortal} from "react-dom";
import {ModalOverlay} from "./modal-overlay/ModalOverlay";
import styles from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalDiv = document.getElementById('modal')

export function Modal({closeModal, title, children}) {

  return createPortal(
    (
      <ModalOverlay closeModal={closeModal}>
        <div
          className={`${styles.modal__div} pt-10 pr-10 pl-10`}
          onClick={e => e.stopPropagation()}
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