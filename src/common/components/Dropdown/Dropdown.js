import './styles.css'
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Dropdown({
  id,
  name,
  label,
  required,
  value,
  placeholder,
  onChange,
  data,
  error,
  disabled,
}) {
  // TODO Callack props
  const [selected, setSelected] = useState({})
  const [dropdownVisible, setDropdownVisible] = useState(false)

  return (
    <div className="dropdown">
      <label className="dropdown__label" htmlFor={id}>
        <span>{label}</span>
        {required && <span className="dropdown__label__required">*</span>}
      </label>
      <div onClick={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
        <div className="dropdown__box">
          {!selected.key ? <p className="dropdown__text">{placeholder}</p>
          : <p className={classNames("dropdown__item")}>
            {selected.icon && <span className="dropdown__icon">{selected.icon}</span>}
            {selected.value}
          </p>}
        </div>
        {dropdownVisible && (
          <ul className="dropdown__list">
            {data.map((item, i) => (
              <>
                {i !== 0 && i !== data.length && <span className="dropdown__separate-line"></span>}
                <li
                  className={classNames("dropdown__item", {
                    'dropdown__item--active': selected.key === item.key
                  })}
                  key={item.key}
                  onClick={() => {
                    setSelected(item)
                    setTimeout(() => {
                      setDropdownVisible(false)
                    }, 100)
                  }}
                >
                  {item.icon && <span className="dropdown__icon">{item.icon}</span>}
                  {item.value}
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
      <span className="dropdown__error">{error}</span>
    </div>
  )
}

Dropdown.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.element,
  }))
}
Dropdown.defaultProps = {
  id: '',
  name: '',
  value: '',
  placeholder: '-- selected -- ',
  error: '',
  disabled: false,
  data: [],
  onChange() {}
}


export default Dropdown;
