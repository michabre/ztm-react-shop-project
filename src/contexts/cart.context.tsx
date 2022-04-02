import { createContext, useState } from "react"

const addCartItem = (cartItems:any[], productToAdd:any) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: parseInt(cartItem.quantity) + 1}
      : cartItem
    )
  }

  return [...cartItems, {...productToAdd, quantity: 1}]
}

interface CartContextInterface {
  isCartOpen: boolean
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: any[]
  addItemToCart: any
}

const CartContext = createContext<CartContextInterface>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: (a:any,b:any) => {}
})

const CartProvider = ({children}:{children:JSX.Element}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const [ cartItems, setCartItems ] = useState([])

  const addItemToCart = (productToAdd:any) => {
    let a:any = addCartItem(cartItems, productToAdd)
    setCartItems( a )
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