import './cart-item.styles.scss'

const CartItem = ({ cartItem }:{cartItem: any}) => {
  const { name, quantity } = cartItem

  console.log(quantity)

  return (
    <div>
      <h2>{name}</h2>
      <span>{quantity}
      </span>
    </div>
  )
}

export default CartItem