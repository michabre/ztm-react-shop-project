import Product from "./IProduct"

interface ICart {
  isCartOpen: boolean
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: Product[]
  addItemToCart: any
  removeItemFromCart: any
  clearItemFromCart: any
  cartCount: number,
  cartTotal: number
}

export default ICart