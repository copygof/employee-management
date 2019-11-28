import './styles.css'
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Dropdown({
  id,
  name,
  label,
  required,
  selected,
  placeholder,
  onSelected,
  data,
  error,
  disabled,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const selectedData = data.find(v => v.key === selected.key)

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
            {selectedData.icon && <span className="dropdown__icon">{selectedData.icon}</span>}
            {selectedData.value}
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
                    onSelected(item)
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
  selected: PropTypes.string,
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
  selected: '',
  placeholder: '',
  error: '',
  disabled: false,
  data: [],
  onSelected() {}
}


export default Dropdown;
