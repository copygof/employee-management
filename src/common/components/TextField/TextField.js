
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
}) {
  return (
    <div className={classNames('text-field')}>
      <label className="text-field__label" htmlFor={id}>
        <span>{label}</span>
        {required && <span className="text-field__label__required">*</span>}
      </label>
      <div className={classNames('text-field__box')}>
        <input
          className={classNames('text-field__input')}
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...value && { value }}
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
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
}
TextField.defaultProps = {
  label: '',
  value: '',
  id: '',
  name: '',
  placeholder: '',
  error: '',
  required: false,
  disabled: false,
  onChange() {},
}

export default TextField;
