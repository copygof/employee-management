
import './styles.css'
import React, { useState, useEffect } from 'react'
import PropTypes, { number } from 'prop-types'
import classNames from 'classnames'
import TextField from '../TextField'

function CitizenID({
  label,
  id,
  required,
  error,
  onChange,
  value,
}) {
  const citizens = value.split('')
  const [citizenID1, setCitizenID1] = useState(citizens.slice(0, 1).join('') || '') // 1
  const [citizenID2, setCitizenID2] = useState(citizens.slice(1, 5).join('') || '') // 4
  const [citizenID3, setCitizenID3] = useState(citizens.slice(5, 10).join('') || '') // 5
  const [citizenID4, setCitizenID4] = useState(citizens.slice(10, 12).join('') || '') // 2
  const [citizenID5, setCitizenID5] = useState(citizens.slice(12, 13).join('') || '') // 1

  useEffect(() => {
    if (
      value !== [
        citizenID1,
        citizenID2,
        citizenID3,
        citizenID4,
        citizenID5
      ].join('') &&
      !!citizenID1 && citizenID1.length === 1 &&
      !!citizenID2 && citizenID2.length === 4 &&
      !!citizenID3 && citizenID3.length === 5 &&
      !!citizenID4 && citizenID4.length === 2 && 
      !!citizenID5 && citizenID5.length === 1 ) {
        
      onChange([
        citizenID1,
        citizenID2,
        citizenID3,
        citizenID4,
        citizenID5
      ].join(''))
    }
  }, [citizenID1, citizenID2, citizenID3, citizenID4, citizenID5, onChange, value])

  return (
    <div className="citizen-id">
      <label className="citizen-id__label" htmlFor={id}>
        <span>{label}</span>
        {required && <span className="citizen-id__label__required">*</span>}
      </label>
      <div className="citizen-id__box">
        <TextField width={32} maxLength={1} value={citizenID1.replace(/\D/g, '')} onChange={e => setCitizenID1(e.target.value)} />
        <span className="citizen-id__separate">-</span>
        <TextField width={62} maxLength={4} value={citizenID2.replace(/\D/g, '')} onChange={e => setCitizenID2(e.target.value)} />
        <span className="citizen-id__separate">-</span>
        <TextField width={72} maxLength={5} value={citizenID3.replace(/\D/g, '')} onChange={e => setCitizenID3(e.target.value)} />
        <span className="citizen-id__separate">-</span>
        <TextField width={48} maxLength={2} value={citizenID4.replace(/\D/g, '')} onChange={e => setCitizenID4(e.target.value)} />
        <span className="citizen-id__separate">-</span>
        <TextField width={32} maxLength={1} value={citizenID5.replace(/\D/g, '')} onChange={e => setCitizenID5(e.target.value)} />
      </div>
      <span className="citizen-id__error">{error}</span>
    </div>
  )
}

CitizenID.propTypes = {
  value: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf([
    'primary',
    'secondary'
  ])
}
CitizenID.defaultProps = {
  value: '',
  text: '',
  disabled: false,
  onClick() {},
}

export default CitizenID;
