import { useContext } from "react"
import { ProductsContext } from "../../contexts/products.context"

const Shop = () => {
  const { products } = useContext(ProductsContext)
  return (
    <div>
      {products.map(({id, name, imageUrl, price}:{id:number, name:string, imageUrl: string, price: number}) => (
        <div key={id}>
          <h3>{name}</h3>
          <img src={imageUrl} alt={name} />
          <p>{price}</p>
        </div>
      ))}
    </div>
  )
}

export default Shop