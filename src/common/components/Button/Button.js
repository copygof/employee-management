
import './styles.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Button({
  children,
  onClick,
  disabled,
  text,
  variant,
}) {
  return (
    <button
      className={classNames('btn', {
        [`btn--${variant}`]: !disabled,
      })}
      disabled={disabled}
      onClick={onClick}>
      {children || (
        <span
         className={classNames('btn__text', {
          [`btn__text--${variant}`]: !disabled,
        })}>
          {text}
        </span>
      )}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf([
    'primary',
    'secondary'
  ])
}
Button.defaultProps = {
  variant: 'primary',
  text: '',
  disabled: false,
  onClick() {},
}

export default Button;
