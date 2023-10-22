import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export function IngredientCard({imageSrc, price, name, count}) {
  return (
    <li style={{display: "flex", flexDirection: "column", minHeight: '208px', position: 'relative'}}>
      {count && <Counter count={count}/>}
      <img src={imageSrc} alt={name} className='mb-1 ml-4 mr-4'/>
      <div style={{display: "flex", justifyContent: 'center'}} className='mb-1'>
        <span className='text_type_digits-default pr-2'>{price}</span>
        <CurrencyIcon type={'primary'}/>
      </div>
      <p className='text text_type_main-default' style={{textAlign: 'center'}}>{name}</p>
    </li>
  )
}