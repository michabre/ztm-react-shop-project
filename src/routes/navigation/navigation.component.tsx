
import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import {
  Button,
  ButtonGroup
} from '@chakra-ui/react'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import { ReactComponent as CrwnLogo } from '../../assets/logo.svg'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from  './navigation.styles'

const Navigation = ({ mode, current }:{ mode:any, current:any }) => {
  let icon = current === 'light' ? <SunIcon /> : <MoonIcon />
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    
    const signOutHandler = async () => {
      await signOutUser()
    }

    return(
      <>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo />
          </LogoContainer>
          <NavLinks>
            <ButtonGroup variant='outline' spacing='2'>
                <Button leftIcon={icon} onClick={mode}>
                I prefer the&nbsp;<strong>{current}</strong>
                </Button>
            </ButtonGroup>
            <NavLink as='span' to="/shop">Shop</NavLink> 
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutHandler}>Sign Out</NavLink>
              ): (<NavLink as='span' to="/auth">Sign In</NavLink> )
            }
            <CartIcon />
          </NavLinks>
          {isCartOpen && (<CartDropdown />)}
        </NavigationContainer>
        <Outlet />
      </>
    )
  }

  export default Navigation