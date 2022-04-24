
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
import './navigation.styles.scss'

const Navigation = ({ mode, current }:{ mode:any, current:any }) => {
  let icon = current === 'light' ? <SunIcon /> : <MoonIcon />
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    
    const signOutHandler = async () => {
      await signOutUser()
    }

    return(
      <>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo />
          </Link>
          <div className='nav-links-container'>
            <ButtonGroup variant='outline' spacing='2'>
                <Button leftIcon={icon} onClick={mode}>
                I prefer the&nbsp;<strong>{current}</strong>
                </Button>
            </ButtonGroup>
            <Link className='nav-link' to="/shop">Shop</Link> 
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutHandler}>Sign Out</span>
              ): (<Link className='nav-link' to="/auth">Sign In</Link> )
            }
            <CartIcon />
          </div>
          {isCartOpen && (<CartDropdown />)}
        </div>
        <Outlet />
      </>
    )
  }

  export default Navigation