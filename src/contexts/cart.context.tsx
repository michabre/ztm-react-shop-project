import { createContext, useState, useEffect } from "react"
import Product from "@interfaces/IProduct"

const addCartItem = (cartItems:Product[], productToAdd:Product) => {
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

const removeCartItem = (cartItems:Product[], productToAdd:Product) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  if (existingCartItem) {
    return cartItems.filter((cartItem) => 
      cartItem.id !== productToAdd.id 
    )
  }
  return [...cartItems]
}

const updateQuantity = (cartItem:Product) => {

}

interface CartContextInterface {
  isCartOpen: boolean
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  cartItems: Product[]
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

  const addItemToCart = (productToAdd:Product) => {
    let a:any = addCartItem(cartItems, productToAdd)
    setCartItems( a )
  }

  const removeItemFromCart = (productToRemove:Product) => {
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