import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"

import "./cart-dropdown.styles.scss"

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {[1,2,3].map((item) => <CartItem cartItem={item} />)}
      </div>
      <Button
        buttonType="default"
        inputOptions={{
          required:false
        }}
      >CHECKOUT
      </Button>

    </div>
  )
}

export default CartDropdown