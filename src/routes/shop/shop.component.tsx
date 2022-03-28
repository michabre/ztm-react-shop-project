import SHOP_DATA from "../../shop-data.json"

const Shop = () => {
  return (
    <div>
      {SHOP_DATA.map(({id, name}) => (
        <div key={id}>
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  )
}

export default Shop