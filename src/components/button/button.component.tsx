
import IButtonClasses from '@interfaces/IButtonClasses'

import './button.styles.scss'

// interface ButtonClasses {
//   [key: string]: string | number;
// }

const BUTTON_TYPE_CLASSES: IButtonClasses = {
  default: '',
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, inputOptions }:{ children:JSX.Element|string, buttonType: string, inputOptions:any }) => {

  let buttonClass = buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ''

  return(
      <button 
        className={`button-container ${buttonClass}`}
        {...inputOptions}
      >
        {children}
      </button>
   

  )
}

export default Button