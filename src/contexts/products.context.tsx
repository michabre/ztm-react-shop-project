import { createContext, useState } from "react"

import PRODUCTS from '../shop-data.json'

const ProductsContext = createContext({
  products: [
    { id: 23, name: "", imageUrl: "", price: 10 }
  ],
});

const ProductsProvider = ({ children }:{children: JSX.Element}) => {
  const [products, setProducts] = useState(PRODUCTS)
  const value = { products }
  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}

export {
  ProductsContext,
  ProductsProvider
}