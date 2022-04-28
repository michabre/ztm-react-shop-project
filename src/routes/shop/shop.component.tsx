import { useContext } from "react"
import { CategoriesContext } from "../../contexts/categories.context"
import ProductCard from "../../components/product-card/product-card.component"
import Product from "@interfaces/IProduct"

import "./shop.styles.scss"

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  return (
    <>
      {Object.keys(categoriesMap).map(title => {
          return (
            <div key={title}>
              <h2>{title}</h2>
              <div className="products-container">
                {categoriesMap[title].map( ( product:Product ) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )
      })}
    </>

    
  )
}

export default Shop