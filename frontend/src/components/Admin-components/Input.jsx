import React, { useId } from 'react';
import '../styles/_input.scss';

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();

  const { invalidProp, ...inputProps } = props;

  return (
    <div className='input-container'>
      {label && (
        <label 
          className='input-label' 
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${className}`}
        ref={ref}
        {...inputProps} // Spread only valid props
        id={id}
      />
    </div>
  );
});

export default Input;
