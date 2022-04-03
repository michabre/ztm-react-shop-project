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

const removeCartItem = (cartItems:any[], productToAdd:any) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  if (existingCartItem) {
    return cartItems.filter((cartItem) => 
      cartItem.id !== productToAdd.id 
    )
  }
  return [...cartItems]
}

interface CartContextInterface {
  isCartOpen: boolean
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: any[]
  addItemToCart: any
  removeItemFromCart: any
  cartCount: number
}

const CartContext = createContext<CartContextInterface>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: (a:any,b:any) => {},
  removeItemFromCart: (a:any) => {},
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

  const removeItemFromCart = (productToRemove:any) => {
    let a: any = removeCartItem(cartItems, productToRemove)
    setCartItems( a )
  }

  const value:CartContextInterface = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, cartCount}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export {
  CartContext,
  CartProvider
}