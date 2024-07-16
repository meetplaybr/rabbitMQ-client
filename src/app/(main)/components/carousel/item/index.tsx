import React from 'react'
import style from './style.module.scss'
const Item = (props: any) => {
  return (
    <div>
      <img className={style.img_product} src={`/demo/images/product/${props.item.image}`} alt={props.item.name} />
    </div>
  )
}

export default Item