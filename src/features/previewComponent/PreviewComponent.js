import React from 'react';
import Button from 'common/components/Button'

function PreviewComponent() {
  return (
    <div>
      <Button text="Button primary" />
      <Button text="Button secondary" variant="secondary" />
      <Button text="Button disabled" disabled />
    </div>
  )
}

export default PreviewComponent
