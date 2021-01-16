import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default function FormField({ id, data, onChange }) {

  const {
    label,
    type,
    definition,
    mask,
    sourceList
  } = data;

  return (
    <FormGroup className="input-field">
      <Label for={id}>{label}</Label>
      {
        type === 'select'
        ? <Input type={type} data-type={type} id={id} onChange={onChange}>
            <option disabled selected>{definition}</option>
            {
              sourceList.map(source => (
                typeof(source) === 'object'
                ? <option key={source.code} value={source.code} >{source.name}</option>
                : <option key={source}>{source}</option>
              ))
            }
          </Input>
        : <Input type={type} data-mask={mask} data-type={type} id={id} placeholder={definition} onChange={onChange} />
      }
      
    </FormGroup>
  );
}