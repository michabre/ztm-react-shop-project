import { createContext, useState } from "react"
import IProducts from "@interfaces/IProducts";

import PRODUCTS from '../shop-data.json'


const ProductsContext = createContext<IProducts | {products:any}>({products:{
  id: 0,
  name: "",
  imageUrl: "",
  price: 0,
  quantity: 0,
}});

const ProductsProvider = ({ children }:{children: JSX.Element}) => {
  const [products, setProducts] = useState(PRODUCTS)
  const sampleAppContext:any = { products }
  return (
    <ProductsContext.Provider value={sampleAppContext}>{children}</ProductsContext.Provider>
  )
}

export {
  ProductsContext,
  ProductsProvider
}