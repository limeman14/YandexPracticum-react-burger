import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export function CreateOrderPanel({sum, onCreateOrderClick}) {
  return (
    <div className='pr-4' style={{display: "flex", alignItems: 'center', justifyContent: 'end'}}>
      <div style={{display: "flex", alignItems: 'baseline'}} className='mr-10'>
        <span className='text_type_digits-medium pr-2'>{sum}</span>
        <CurrencyIcon type={'primary'} width='36px'/>
      </div>
      <Button htmlType='button' size='large' type="primary" onClick={onCreateOrderClick}>
        Оформить заказ
      </Button>
    </div>
  )
}