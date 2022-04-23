import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

import "./checkout-item.styles.scss"

const CheckoutItem = ({ cartItem }:{ cartItem:any }) => {
  const { name, imageUrl, price, quantity } = cartItem
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
  
  const addItemHandler = () => addItemToCart(cartItem)
  const decreaseItemHandler = () => removeItemFromCart(cartItem)
  const clearItemHandler = () => clearItemFromCart(cartItem)

  return (
    <tr>
      <td><div className="image-container"><img src={imageUrl} alt={name} /></div></td>
      <td className="name">{name}</td>
      <td className="quantity">
        <button className="arrow" onClick={decreaseItemHandler}>&#60;</button>
        <span className="value">{quantity}</span>
        <button className="arrow" onClick={addItemHandler}>&#62;</button>
      </td>
      <td className="price">{price}</td>
      <td className="remove-button"><button onClick={clearItemHandler}>&times;</button></td>
    </tr>
  )

}

export default CheckoutItem