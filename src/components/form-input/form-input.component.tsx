import './form-input.styles.scss'

interface IFormInput {
  required:boolean;
  type: string;
  onChange: any; 
  name: string; 
  value: string;
}

const FormInput = ({ label, inputOptions }:{ label:string, inputOptions:IFormInput }) => {
  return (
    <div className="group">
      {label && (
          <>
          <input 
              className="form-input"
              {...inputOptions}
            />
            <label className={`${inputOptions.value.length ? 'shrink': ''} form-input-label`}>{label}</label>
            
          </>
        )
      }
      
    </div>
  )
}

export default FormInput