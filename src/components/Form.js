import React, { Fragment, useState, useEffect } from 'react';
import FormField from './FormField';
import form from '../data/data';
import {
  Form as ReactStrapForm,
  Button,
  Progress,
  Col,
  Row
} from 'reactstrap';

// Constants
const totalInputs = form['Home Address'].length + form['Home Address'].length;
const inputMap = {};

// mapFormStatus
const mapFormStatus = data => {
  const temp = data;
  temp.forEach(field => {
    if (field.dependencies) {
      const ids = Object.keys(field.dependencies);
      if (!ids.includes(field.id)) {
        field['isDisabled'] = true;
      } else {
        field['isNotEmpty'] = false;
      }
    }
    field['value'] = '';
  })
  return temp;
} 

const mapFullNameStatus = mapFormStatus([...form['Full Name']]);
const mapHomeAddressStatus = mapFormStatus([...form['Home Address']]);

const mapFormData = form => {
    const data = {};

    form.forEach(field => {
      data[field.id] = {
        ...field
      }
    })

    return data;
}

export default function Form() {
  const [formProgress, setFormProgress] = useState({ totalProgress: 0 });
  const { totalProgress } = formProgress;
  const [fullName, setFullName] = useState([...mapFullNameStatus]);
  const [homeAddress, setHomeAddress] = useState([...mapHomeAddressStatus]);

  const updateDependencies = (id, type, parent, checked, value) => {
    let parentData = [];

    switch (parent) {
      case 'Full Name':
        parentData = [...fullName];
        parentData.forEach(field => {
          if (field.dependencies) {
            if (field.dependencies[id]) {
              const ids = Object.keys(field.dependencies);
              ids.forEach(id => {                
                if (field.dependencies[id]) {
                  if (type === 'checkbox') {
                    field['isDisabled'] = !checked;
                  } else {
                    console.log(value);
                  }
                }
              })
            }
          }
        })
        
        setFullName(parentData);
        break;
      case 'Home Address':
        parentData = [...homeAddress];
        parentData.forEach(field => {
          if (field.dependencies) {
            if (field.dependencies[id]) {
              const ids = Object.keys(field.dependencies);
              ids.forEach(id => {                
                if (field.dependencies[id]) {
                  if (type === 'checkbox') {
                    field['isDisabled'] = !checked;
                  } else {
                    // get value
                    const mappedData = mapFormData(parentData);
                    const value = mappedData[id].value;
                    const validationMethod = field.dependencies[id];

                  }
                }
              })
            }
          }
        })
        setHomeAddress(parentData);
        break;
      default:
    }
  }

  const updateValue = (parent, index, value) => {
    let parentData = [];

    switch (parent) {
      case 'Full Name':
        parentData = [...fullName];
        parentData[index].value = value;
        setFullName(parentData);
        break;
      case 'Home Address':
        parentData = [...homeAddress];
        parentData[index].value = value;
        setHomeAddress(parentData);
        break;
      default:
    }
  }

  const onChange = e => {
    const { type, parent, empty, index } = e.target.dataset;
    switch(type) {
      case 'checkbox':
        inputMap[e.target.id] = e.target.checked;
        updateValue(parent, index, e.target.checked);
        updateDependencies(e.target.id, type, parent, e.target.checked, null);
        break;
      default:
        inputMap[e.target.id] = e.target.value;
        updateValue(parent, index, e.target.value);
        if (empty === 'false') {
          updateDependencies(e.target.id, type, parent, null, e.target.value);
        }
    }
    checkFormProgress();
  }

  const checkFormProgress = () => {
    for (let input in inputMap) {
      if (inputMap[input] === false || inputMap[input] === '') {
        delete inputMap[input];
      }
    }

    const totalInputsInserted = Object.keys(inputMap).length;
    setFormProgress({ totalProgress: (totalInputsInserted / totalInputs) * 100 })
  }

  const formSubmit = e => {
    e.preventDefault();
  }

  return (
    <Fragment>
      <Progress className="mb-3" animated value={totalProgress}>
        {Math.floor(totalProgress)}%
      </Progress>
      <ReactStrapForm onSubmit={formSubmit}>
        <Row form>
          <Col md={12}><p className="h4">Full Name</p></Col>
          {
            fullName.map(({id, ...otherProps}, index) => (
              <Col md={6} key={id}>
                <FormField
                  id={id}
                  data={otherProps}
                  parent="Full Name"
                  onChange={onChange}
                  index={index}
                />
              </Col>
            ))
          }
        </Row>
        <Row form>
          <Col md={12}><p className="h4">Home Address</p></Col>
          {
            homeAddress.map(({id, ...otherProps}, index) => (
              <Col md={6} key={id}>
                <FormField
                  id={id}
                  data={otherProps}
                  parent="Home Address"
                  onChange={onChange}
                  index={index}
                />
              </Col>
            ))
          }
        </Row>
        <Button>Submit</Button>
      </ReactStrapForm>
    </Fragment>
  )
}