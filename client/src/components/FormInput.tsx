import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
  inputId: string;
  inputType: HTMLInputTypeAttribute;
  placeholder: string;
  labelText: string;
  onChange: ChangeEventHandler;
  errorMessage: string;
}

const FormInput = (props: Props) => {
  const { inputId, inputType, placeholder, labelText, onChange, errorMessage } =
    props;
  return (
    <div className="form-floating mb-4">
      <input
        type={inputType}
        id={inputId}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
      />
      <label htmlFor={inputId}>{labelText}</label>
      {/* <span className="error-text">{errorMessage}</span> */}
      <p className="error-text">{errorMessage}</p>
    </div>
  );
};

export default FormInput;
