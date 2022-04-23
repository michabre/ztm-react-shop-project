import { createContext, useState, useEffect } from "react"
import Product from "@interfaces/IProduct"
import ICart from "@interfaces/ICart"

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

const removeCartItem = (cartItems:Product[], productToRemove:Product) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => 
      cartItem.id !== productToRemove.id 
    )
  }

  return cartItems.map((cartItem) => 
    cartItem.id === productToRemove.id 
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  )
}

const clearCartItem = (cartItems:Product[], productToClear:Product) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
}

const CartContext = createContext<ICart>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: (item:Product) => {},
  removeItemFromCart: (item:Product) => {},
  clearItemFromCart: (item:Product) => {},
  cartCount: 0,
  cartTotal: 0
})

const CartProvider = ({children}:{children:JSX.Element}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const [ cartItems, setCartItems ] = useState([])
  const [ cartCount, setCartCount] = useState(0)
  const [ cartTotal, setCartTotal] = useState(0)

  useEffect(()=> {
    const newCartCount = cartItems.reduce((total:number, cartItem:Product) => {
      return total + cartItem?.quantity
    }, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(()=> {
    const newCartTotal = cartItems.reduce(
      (total:number, cartItem:Product) => total + cartItem.quantity * cartItem.price
    , 0)
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd:Product) => {
    let item:any = addCartItem(cartItems, productToAdd)
    setCartItems( item )
  }

  const removeItemFromCart = (productToRemove:Product) => {
    let item:any = removeCartItem(cartItems, productToRemove)
    setCartItems( item )
  }

  const clearItemFromCart = (productToClear:Product) => {
    let item:any = clearCartItem(cartItems, productToClear)
    setCartItems( item )
  }

  const value:ICart = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, cartTotal}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export {
  CartContext,
  CartProvider
}