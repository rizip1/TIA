import React from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

export default (field) => {
  return (
    <FormGroup>
      <FormControl {...field.input}
        placeholder={field.placeholder}
        type={field.type}
      />
    </FormGroup>
  )
}
