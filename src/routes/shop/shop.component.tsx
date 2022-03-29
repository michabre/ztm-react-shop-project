import { useContext } from "react"
import { ProductsContext } from "../../contexts/products.context"

const Shop = () => {
  const { products } = useContext(ProductsContext)
  return (
    <div>
      {products.map(({id, name, imageUrl, price}) => (
        <div key={id}>
          <h3>{name}</h3>
          <img src={imageUrl} />
          <p>{price}</p>
        </div>
      ))}
    </div>
  )
}

export default Shop