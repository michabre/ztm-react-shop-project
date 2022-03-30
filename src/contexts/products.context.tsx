import { createContext, useState } from "react"

import PRODUCTS from '../shop-data.json'
interface ProductsContextInterface {
  products: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
  }[]
}

const ProductsContext = createContext<ProductsContextInterface | {products:any}>({products: {
  id: 0,
  name: "",
  imageUrl: "",
  price: 0
}});

const ProductsProvider = ({ children }:{children: JSX.Element}) => {
  const [products, setProducts] = useState(PRODUCTS)
  const sampleAppContext: ProductsContextInterface = { products };
  return (
    <ProductsContext.Provider value={sampleAppContext}>{children}</ProductsContext.Provider>
  )
}

export {
  ProductsContext,
  ProductsProvider
}