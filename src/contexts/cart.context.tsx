import { createContext, useState } from "react"

const addCartItem = (cartItems, productToAdd) => {

}

interface CartContextInterface {
  isCartOpen: boolean
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: any[]
  addItemToCart: () => void
}

const CartContext = createContext<CartContextInterface>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {}
})

const CartProvider = ({children}:{children:JSX.Element}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const [ cartItems, setCartItems ] = useState([])

  const addItemToCart = (productToAdd:any) => {
    setCartItems( addCartItem(cartItems, productToAdd) )
  }

  const value:CartContextInterface = {isCartOpen, setIsCartOpen, cartItems, addItemToCart}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export {
  CartContext,
  CartProvider
}