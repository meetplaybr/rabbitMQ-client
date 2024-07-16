import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './item'
import style from './style.module.scss'
const CarouselApp = (props: any) => {
  return (
    <Carousel className={style.carousel_item}>
      {props.itens.map((item:any) => <Item key={item.id} item={item}/>  )}
    </Carousel>
  )
}

export default CarouselApp