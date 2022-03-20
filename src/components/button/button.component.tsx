import './button.styles.scss'

interface ButtonClasses {
  [key: string]: string | number;
}

const BUTTON_TYPE_CLASSES: ButtonClasses = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, inputOptions }:{ children:any, buttonType: string, inputOptions:any }) => {

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