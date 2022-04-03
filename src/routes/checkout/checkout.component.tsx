import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

import './checkout.styles.scss'

const Checkout = () => {
  const  { cartItems } = useContext(CartContext)

  return (
    <div className='checkout-container'>
      <h2 className='title'>Checkout Section</h2>
      <p>Render the checkout product list here</p>
      {cartItems && cartItems.map((item) => {
        return (
          <p>{item.name}</p>
        )
      })}
    </div>
  )
}

export default Checkout