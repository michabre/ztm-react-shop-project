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

  //return [...cartItems]
  return cartItems.map((cartItem) => 
  cartItem.id === productToRemove.id 
  ? {...cartItem, quantity: cartItem.quantity - 1}
  : cartItem
)
}

const updateItemQuantity = (cartItems:Product[], qType:string, productToUpdate:Product) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToUpdate.id)
  let updateThis = (qType === 'increase') ? ++productToUpdate.quantity: (productToUpdate.quantity > 0) ? --productToUpdate.quantity: 0
  return [...cartItems]
}

const CartContext = createContext<ICart>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: (a:any,b:any) => {},
  removeItemFromCart: (a:any) => {},
  cartCount: 0,
  updateQuantity: (a:string, b:any) => {}
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

  const updateQuantity = (changeType: string, productToUpdate:Product) => {
    let a: any = updateItemQuantity(cartItems, changeType, productToUpdate)
    setCartItems(a)
  }

  const value:ICart = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, cartCount, updateQuantity}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export {
  CartContext,
  CartProvider
}