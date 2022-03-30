import Button from "../button/button.component"

import "./cart-dropdown.styles.scss"

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
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