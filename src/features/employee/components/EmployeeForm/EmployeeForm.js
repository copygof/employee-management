
import './styles.css'
import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { Formik, useFormik } from 'formik'
import { getCountryCallingCode } from 'libphonenumber-js'
import countryList from 'country-list'
import TextField from 'common/components/TextField'
import Button from 'common/components/Button'
import Dropdown from 'common/components/Dropdown'
import DateField from 'common/components/DateField/DateField'
import CitizenID from 'common/components/CitizenID'
import { createNewEmployee, updateNewEmployee, selectors } from '../../redux'

let employeeSchema = yup.object().shape({
  title: yup.object().shape({
    key: yup.string(),
    value: yup.string(),
  }).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthday: yup.string().required(),
  nationality: yup.object().shape({
    key: yup.string(),
    value: yup.string(),
  }),
  citizenId: yup.string(),
  gender: yup.string(),
  mobilePhone: yup.object().shape({
    prefix: yup.string(),
    number: yup.string(),
    icon: yup.string(),
  }).required(),
  passwordNo: yup.string(),
  expectedSalary: yup.string().required(),
})

const INITIAL_VALUE = {
  title: {
    key: 'mr',
    value: 'Mr'
  },
  firstName: '',
  lastName: '',
  birthday: '',
  nationality: {
    key: 'th',
    value: ''
  },
  citizenId: '',
  gender: '',
  mobilePhone: {
    prefix: 'th',
    number: '',
  },
  passwordNo: '',
  expectedSalary: '',
}

function EmployeeForm({
  id
}) {
  const dispatch = useDispatch()
  const employeeDetail = useSelector(selectors.getEmployeeById(id))

  const handleOnSubmit = (values) => {
    if (id) {
      dispatch(updateNewEmployee(id, values))
    } else {
      dispatch(createNewEmployee(values))
    }
  }

  const initialValues = id ? employeeDetail : INITIAL_VALUE

  const formbag = useFormik({
    initialValues,
    enableReinitialize: true,
    isInitialValid: false,
    validationSchema: employeeSchema,
    onSubmit: handleOnSubmit,
  })

  return (
    <div className="employee-form">
      <div className="section-field">
        <Dropdown
          required
          id="title"
          label="Title:"
          onSelected={(selected) => {
            formbag.setFieldValue('title', selected)
            setTimeout(formbag.handleBlur('title'), 100)
          }}
          selected={formbag.values.title}
          error={formbag.touched.title ? formbag.errors.title : ''}
          data={[
            { key: 'mr', value: 'Mr' },
            { key: 'mrs', value: 'Mrs' },
            { key: 'miss', value: 'Miss' },
          ]}
        />
        <div className="spacer" />
        <TextField
          required
          id="firstName"
          label="First name:"
          onChange={formbag.handleChange('firstName')}
          onBlur={formbag.handleBlur('firstName')}
          value={formbag.values.firstName}
          error={formbag.touched.firstName ? formbag.errors.firstName : ''}
        />
        <div className="spacer" />
        <TextField
          required
          id="lastName"
          label="Last name:"
          onChange={formbag.handleChange('lastName')}
          onBlur={formbag.handleBlur('lastName')}
          value={formbag.values.lastName}
          error={formbag.touched.lastName ? formbag.errors.lastName : ''}
        />
      </div>

      <div className="section-field">
        <DateField
          required
          id="birthday"
          label="Birthday:"
          onChange={formbag.handleChange('birthday')}
          onBlur={formbag.handleBlur('birthday')}
          value={formbag.values.birthday}
          error={formbag.touched.birthday ? formbag.errors.birthday : ''}
        />
        <div className="spacer" />
        <Dropdown
          required
          id="nationality"
          label="Nationality:"
          placeholder="-- Please select --"
          onSelected={(selected) => {
            formbag.setFieldValue('nationality', {
              key: selected.key,
              value: selected.value
            })
            setTimeout(formbag.handleBlur('nationality'), 100)
          }}
          selected={{
            key: formbag.values.nationality.key,
          }}
          error={formbag.touched.nationality ? formbag.errors.nationality : ''}
          data={Object.entries(countryList.getCodeList()).map(([code, name]) => {
            return (
              { key: code, value: name, icon: <i className={`flag-icon flag-icon-${code.toLowerCase()}`} /> }
            )
          })}
        />
      </div>

      <div className="section-field">
        <CitizenID
          id="citizenId"
          label="CitizenID:"
          onChange={formbag.handleChange('citizenId')}
          onBlur={formbag.handleBlur('citizenId')}
          value={formbag.values.citizenId}
          error={formbag.touched.citizenId ? formbag.errors.citizenId : ''}
        />
      </div>

      <div className="section-field">
        <div>
          <label htmlFor="gender" >Gender:</label>
          <div className="gender-radio">
            <input
              checked={formbag.values.gender === 'male'}
              onChange={formbag.handleChange('gender')}
              className="radio"
              type="radio"
              name="gender"
              value="male" />  Male<br></br>
            <input
              checked={formbag.values.gender === 'female'}
              onChange={formbag.handleChange('gender')}
              className="radio"
              type="radio"
              name="gender"
              value="female" />  Female<br></br>
            <input
              checked={formbag.values.gender === 'unisex'}
              onChange={formbag.handleChange('gender')}
              className="radio"
              type="radio"
              name="gender"
              value="unisex" />  Unisex<br></br>
          </div>
        </div>
      </div>

      <div className="section-field">

        <Dropdown
          id="phone-prefix"
          label="Mobile phone"
          placeholder="-- Please select --"
          onSelected={(selected) => {
            formbag.setFieldValue('mobilePhone.prefix', selected.key)
            setTimeout(formbag.handleBlur('mobilePhone.prefix'), 100)
          }}
          selected={{
            key: formbag.values.mobilePhone.prefix,
          }}
          error={formbag.touched.mobilePhone ? _.get(formbag, 'errors.mobilePhone.prefix') : ''}
          data={Object.entries(countryList.getCodeList()).map(([code, name]) => {
            let value = ''

            try {
              value = `+${getCountryCallingCode(code.toLocaleUpperCase())}`
            } catch (e) {

            }
            
            return (
              { key: code, value: value, icon: <i className={`flag-icon flag-icon-${code.toLowerCase()}`} /> }
            )
          })}
        />
        <span style={{ alignSelf: 'center', marginTop: 26, marginLeft: 8, marginRight: 8, }}>-</span>
        <div style={{ paddingTop: 21 }}>
          <TextField
            id="phone-number"
            label=" "
            onChange={e => formbag.handleChange('mobilePhone.number')(e.target.value.replace(/\D/g, ''))}
            onBlur={formbag.handleBlur('mobilePhone.number')}
            value={formbag.values.mobilePhone.number}
            error={formbag.touched.mobilePhone ? _.get(formbag, 'errors.mobilePhone.number') : ''}
          />
        </div>
      </div>

      <div className="section-field">
        <TextField
          id="passwordNo"
          label="Password No:"
          onChange={formbag.handleChange('passwordNo')}
          onBlur={formbag.handleBlur('passwordNo')}
          value={formbag.values.passwordNo}
          error={formbag.touched.passwordNo ? formbag.errors.passwordNo : ''}
        />
      </div>
      
      <div className="section-field">
        <TextField
          required
          id="expectedSalary"
          label="Expected Salary:"
          onChange={e => formbag.handleChange('expectedSalary')(e.target.value.replace(/\D/g, ''))}
          onBlur={formbag.handleBlur('expectedSalary')}
          value={formbag.values.expectedSalary}
          error={formbag.touched.expectedSalary ? formbag.errors.expectedSalary : ''}
        />
        <span style={{ alignSelf: 'center', marginTop: 26, marginLeft: 8, marginRight: 8, }}>THB</span>
      </div>

      <div className="section-field">
        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
         <Button text="Submit" onClick={formbag.handleSubmit} disabled={!formbag.isValid} />
        </div>
      </div>
    </div>
  )
}

EmployeeForm.propTypes = {
  id: PropTypes.string,
}
EmployeeForm.defaultProps = {
  // id: 'b5d4d468-a328-4dfa-9fa6-75a3d419ffc8',
  id: ''
}

export default EmployeeForm;
