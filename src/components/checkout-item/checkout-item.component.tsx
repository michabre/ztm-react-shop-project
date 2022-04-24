import { useContext } from "react"
import { Box, Flex, Text } from '@chakra-ui/react'
import { CartContext } from "../../contexts/cart.context"
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { FaDollarSign } from 'react-icons/fa';



import "./checkout-item.styles.scss"

const CheckoutItem = ({ cartItem }:{ cartItem:any }) => {
  const { name, imageUrl, price, quantity } = cartItem
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
  
  const addItemHandler = () => addItemToCart(cartItem)
  const decreaseItemHandler = () => removeItemFromCart(cartItem)
  const clearItemHandler = () => clearItemFromCart(cartItem)

  return (
    <tr>
      <td><div className="image-container"><img src={imageUrl} alt={name} /></div></td>
      <td className="name"><Text align={'center'}>{name}</Text></td>
      <td className="quantity">
        <Flex justify={'center'}>
          <button className="arrow" onClick={decreaseItemHandler}><MinusIcon /></button>
          <Box m={4}><span className="value">{quantity}</span></Box>
          <button className="arrow" onClick={addItemHandler}><AddIcon /></button>
        </Flex>
      </td>
      <td className="price">
        <Flex justify={'center'}>
          <FaDollarSign /> 
          {price}
        </Flex>
      </td>
      <td className="remove-button">
        <Flex justify={'center'}>
          <button onClick={clearItemHandler}><DeleteIcon /></button>
        </Flex>
      </td>
    </tr>
  )

}

export default CheckoutItem