import React from 'react';
import Button from 'common/components/Button'
import TextField from 'common/components/TextField';
import DateField from 'common/components/DateField/DateField';
import Dropdown from 'common/components/Dropdown';
import CitizenID from 'common/components/CitizenID';

function PreviewComponent() {
  return (
    <div>
      <div style={{ margin: 12 }}>
        <CitizenID label="CitizenID" />
      </div>
      <div style={{ margin: 12 }}>
        <Button text="Button primary" />
        <Button text="Button secondary" variant="secondary" />
        <Button text="Button disabled" disabled />
      </div>
      <div style={{ margin: 12 }}>
        <TextField  label="First name" placeholder="First name" />
        <TextField disabled label="First name" placeholder="First name" />
        <TextField required label="Last name" placeholder="Last name" error="Last name is required" />
      </div>
      <div style={{ margin: 12 }}>
        <DateField required label="Birthday"  />
      </div>
      <div style={{ margin: 12 }}>
        <Dropdown required label="Title:" data={[
          { key: 'mr', value: 'Mr' },
          { key: 'mrs', value: 'Mrs' },
        ]} />
      </div>
      <div style={{ margin: 12 }}>
        <Dropdown required label="Phone:" data={[
          { key: 'mr', value: 'Mr', icon: <i  className="flag-icon flag-icon-gr"/> },
          { key: 'mrs', value: 'Mrs', icon: <i className="flag-icon flag-icon-gr" /> },
        ]} />
      </div>
    </div>
  )
}

export default PreviewComponent
