import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

import "./checkout-item.styles.scss"

const CheckoutItem = ({ cartItem }:{ cartItem:any }) => {
  const { name, imageUrl, price, quantity } = cartItem
  const { addItemToCart, removeItemFromCart } = useContext(CartContext)

  return (
    <tr>
      <td><div className="image-container"><img src={imageUrl} alt={name} /></div></td>
      <td className="name">{name}</td>
      <td className="quantity">
        <button onClick={() => { removeItemFromCart(cartItem)} }>&#60;</button>
          {quantity}
        <button onClick={() => { addItemToCart(cartItem)} }>&#62;</button>
      </td>
      <td className="price">{price}</td>
      <td className="remove-button"><button onClick={() => { removeItemFromCart(cartItem)} }>&times;</button></td>
    </tr>
  )

}

export default CheckoutItem