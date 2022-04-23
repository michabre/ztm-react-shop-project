import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import Product from "@interfaces/IProduct"
import CheckoutItem from "components/checkout-item/checkout-item.component"

import './checkout.styles.scss'

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)

  return (
    <div className='checkout-container'>

      <h2 className='title'>Checkout Section</h2>
      {cartItems.length <= 0 && <p>No products have been added to the cart.</p>}

      {cartItems.length > 0 && (
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
              return <CheckoutItem key={item.id} cartItem={item} />
            })}
          </tbody>
          <tfoot>
          <tr>
              <th scope="row">Total</th>
              <td>${cartTotal}</td>
          </tr>
          </tfoot>
        </table>
      )}
      
    </div>
  )
}

export default Checkout