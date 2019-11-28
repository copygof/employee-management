
import './styles.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function TextField({
  children,
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  error,
  type,
  pattern,
  maxLength,
  width,
}) {
  return (
    <div className={classNames('text-field')} style={{ ...width && { width, flex: 0 } }}>
      <label className="text-field__label" htmlFor={id}>
        <span>{label}</span>
        {required && <span className="text-field__label__required">*</span>}
      </label>
      <div className={classNames('text-field__box', {
        'text-field__box--disabled': disabled
      })}>
        <input
          className={classNames('text-field__input', {
            'text-field__box--disabled': disabled
          })}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          required={required}
          value={value}
          {...pattern && { pattern }}
          {...maxLength && { maxLength }}
        />
        {children}
      </div>
      <span className="text-field__error">{error}</span>
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
}
TextField.defaultProps = {
  type: 'text',
  label: '',
  value: '',
  id: '',
  name: '',
  placeholder: '',
  error: '',
  pattern: '',
  required: false,
  disabled: false,
  onChange() {},
}

export default TextField;
