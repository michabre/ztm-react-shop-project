import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import Product from "@interfaces/IProduct"

import './checkout.styles.scss'

const Checkout = () => {
  const  { removeItemFromCart, cartItems, updateQuantity } = useContext(CartContext)
  let total: number = 0
  const removeItem = (product:Product) => removeItemFromCart(product)
  const quantityHandler = (type:string, product:Product) => updateQuantity(type, product)

  return (
    <div className='checkout-container'>
      <h2 className='title'>Checkout Section</h2>
      {cartItems.length <= 0 && <p>No products have been added to the cart.</p>}

      <table className="product-table">
        <caption>This is the checkout table</caption>
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.map((item) => {
            total += item.quantity * item.price
            return (
              <tr key={item.id}>
                <td><img src={item.imageUrl} alt={item.name} /></td>
                <td>{item.name}</td>
                <td>
                  <button onClick={() => { quantityHandler('decrease', item)} }>&#60;</button>
                    {item.quantity}
                  <button onClick={() => { quantityHandler('increase', item)} }>&#62;</button>
                </td>
                <td>{item.price}</td>
                <td><button onClick={() => { 
                  removeItem(item)
                }}>Remove</button></td>
              </tr>
            )
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