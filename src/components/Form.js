import React from 'react';
import FormField from './FormField';
import form from '../data/data';
import { Form as ReactStrapForm, Button} from 'reactstrap';

export default function Form() {
  const allFormData = [...form['Full Name'], ...form['Home Address']];

  return (
    <ReactStrapForm>
      {
        allFormData.map(({ id, label, type, definition, ...otherProps }) => (
          <FormField id={id} label={label} type={type} definition={definition} otherProps={otherProps} key={id} />
        ))
      }
      <Button>Submit</Button>
    </ReactStrapForm>
  )
}