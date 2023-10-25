import {Modal} from "../../../../modal/Modal";

export function OrderDetails({onClose}) {
  return (
    <Modal closeModal={onClose}>
      <div className='mt-4' style={{display: "flex", flexDirection: 'column'}}>
        <span className='text_type_digits-large'>034536</span>
      </div>
    </Modal>
  )
}