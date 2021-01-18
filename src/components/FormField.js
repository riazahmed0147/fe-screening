import React from 'react';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';

export default function FormField({ id, data, parent, onChange, index }) {

  const {
    label,
    type,
    definition,
    mask,
    sourceList,
    isDisabled,
    isNotEmpty,
    value,
  } = data;

  return (
    <FormGroup className="input-field">
      <Label for={id}>{label}</Label>
      {
        type === 'select'
        ? <Input 
            type={type}
            data-type={type}
            data-parent={parent}
            data-empty={isNotEmpty}
            data-index={index}
            id={id}
            disabled={isDisabled}
            onChange={onChange}
            value={value}
          >
            <option value="">{definition}</option>
            {
              sourceList.map(source => (
                typeof(source) === 'object'
                ? <option key={source.code} value={source.code}>{source.name}</option>
                : <option key={source}>{source}</option>
              ))
            }
          </Input>
        : <Input 
            type={type} 
            data-mask={mask}
            data-type={type}
            data-parent={parent}
            data-empty={isNotEmpty}
            data-index={index}
            value={value}
            id={id}
            disabled={isDisabled}
            placeholder={definition}
            onChange={onChange}
          />
      }
    </FormGroup>
  );
}