import { createContext, useState, useEffect } from "react"

const addCartItem = (cartItems:any[], productToAdd:any) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1}
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
  cartCount: number
}

const CartContext = createContext<CartContextInterface>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: (a:any,b:any) => {},
  cartCount: 0
})

const CartProvider = ({children}:{children:JSX.Element}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const [ cartItems, setCartItems ] = useState([])
  const [ cartCount, setCartCount] = useState(0)

  useEffect(()=> {
    const newCartCount = cartItems.reduce((total:number, cartItem:any) => {
      return total + cartItem?.quantity
    }, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd:any) => {
    let a:any = addCartItem(cartItems, productToAdd)
    setCartItems( a )
  }

  const value:CartContextInterface = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export {
  CartContext,
  CartProvider
}