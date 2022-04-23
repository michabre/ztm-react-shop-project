import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import Product from "@interfaces/IProduct"
import CheckoutItem from "components/checkout-item/checkout-item.component"

import './checkout.styles.scss'

const Checkout = () => {
  const { addItemToCart, removeItemFromCart, cartItems, updateQuantity } = useContext(CartContext)
  let total: number = 0
  // const removeItem = (product:Product) => removeItemFromCart(product)
  // const quantityHandler = (type:string, product:Product) => updateQuantity(type, product)

  return (
    <div className='checkout-container'>


      <h2 className='title'>Checkout Section</h2>
      {cartItems.length <= 0 && <p>No products have been added to the cart.</p>}

      <table className="product-table">
        <thead className="checkout-header">
          <tr>
            <th className="header-block">Product</th>
            <th className="header-block">Description</th>
            <th className="header-block">Quantity</th>
            <th className="header-block">Price</th>
            <th className="header-block">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.map((item) => {
            total += item.quantity * item.price
            return <CheckoutItem key={item.id} cartItem={item} />
          })}
        </tbody>
        <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>${total}</td>
        </tr>
        </tfoot>
      </table>
      
    </div>
  )
}

export default Checkout