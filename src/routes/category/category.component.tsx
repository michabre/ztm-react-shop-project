import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Product from "@interfaces/IProduct"
import ProductCard from "components/product-card/product-card.component"

import { CategoriesContext } from "contexts/categories.context"

import "./category.styles.scss"

const Category = () => {
  const { category } = useParams()
  let cat:string = category || "hats"
  const { categoriesMap } = useContext(CategoriesContext)
  const [ products, setProducts ] = useState(categoriesMap[cat])

  //console.log(products)

  useEffect(() => {
    setProducts(categoriesMap[cat])
  }, [category, categoriesMap])

  return (
    <div className="category-container">
      {
        products && products.map((product:Product) => {
          return <ProductCard key={product.id} product={product} />
        })
      }
    </div>
  )
  
}

export default Category