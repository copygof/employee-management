import React from 'react';
import Button from 'common/components/Button'
import TextField from 'common/components/TextField';
import DateField from 'common/components/DateField/DateField';

function PreviewComponent() {
  return (
    <div>
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
    </div>
  )
}

export default PreviewComponent
