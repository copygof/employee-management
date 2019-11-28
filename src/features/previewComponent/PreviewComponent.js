import React from 'react';
import Button from 'common/components/Button'
import TextField from 'common/components/TextField';

function PreviewComponent() {
  return (
    <div>
      <div style={{ margin: 12 }}>
        <Button text="Button primary" />
        <Button text="Button secondary" variant="secondary" />
        <Button text="Button disabled" disabled />
      </div>
      <div style={{ margin: 12 }}>
        <TextField label="First name" placeholder="First name" />
        <TextField label="Last name" placeholder="Last name" required error="Last name is required" />
      </div>
    </div>
  )
}

export default PreviewComponent
