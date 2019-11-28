import './styles.css'
import React from 'react';
import TextField from '../TextField';

function DateField(props) {
  return <TextField {...props} type="date" />
}

export default DateField;
