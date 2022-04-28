import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import "@fontsource/montserrat"
import "@fontsource/karla"
import './index.scss'
import App from './App'
import { UserProvider } from './contexts/user.context'
import { CategoriesProvider } from './contexts/categories.context'
import { CartProvider } from './contexts/cart.context'
import reportWebVitals from './reportWebVitals'
import theme from './theme'
const rootElement = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  rootElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
