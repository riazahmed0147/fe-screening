import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default function FormField({ id, label, type, definition, otherProps }) {
  console.log(otherProps)
  return (
    <FormGroup className="input-field">
      <Label for={id}>{label}</Label>
      {
        type === 'select'
        ? <Input type={type} id={id} placeholder={definition}>
            {
              otherProps.sourceList.map(source => (
                typeof(source) === 'object'
                ? <option key={source.code} value={source.code}>{source.name}</option>
                : <option key={source}>{source}</option>
              ))
            }
          </Input>
        : <Input type={type} id={id} placeholder={definition} />
      }
      
    </FormGroup>
  );
}