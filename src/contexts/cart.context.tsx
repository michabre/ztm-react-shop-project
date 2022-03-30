import { createContext, useState } from "react"

interface CartContextInterface {
  isCartOpen: boolean; 
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextInterface>({
  isCartOpen: false,
  setIsCartOpen: () => {}
})

const CartProvider = ({children}:{children:JSX.Element}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const value:CartContextInterface = {isCartOpen, setIsCartOpen}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export {
  CartContext,
  CartProvider
}