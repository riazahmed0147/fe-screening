import React, { Fragment, useState } from 'react';
import FormField from './FormField';
import form from '../data/data';
import { Form as ReactStrapForm, Button, Progress, Col, Row } from 'reactstrap';

// Constants
const fullName = [...form['Full Name']];
const homeAddress = [...form['Home Address']];
const totalInputs = fullName.length + homeAddress.length;
const inputMap = {};

export default function Form() {
  const [formProgress, setFormProgress] = useState({ totalProgress: 0 });
  const { totalProgress } = formProgress;

  const onChange = e => {
    const nodeType = e.target.dataset.type;

    switch(nodeType) {
      case 'checkbox':
        inputMap[e.target.id] = e.target.checked;
        break;
      case 'text':
      case 'select':
      case 'number':
        inputMap[e.target.id] = e.target.value;
        break;
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
  return (
    <Fragment>
      <Progress className="mb-3" animated value={totalProgress}>
        {Math.floor(totalProgress)}%
      </Progress>
      <ReactStrapForm>
        <Row form>
          <Col md={12}><p className="h4">Full Name</p></Col>
          {
            fullName.map(({id, ...otherProps}) => (
              <Col md={6}>
                <FormField id={id} data={otherProps} onChange={onChange} key={id} />
              </Col>
            ))
          }
        </Row>
        <Row form>
          <Col md={12}><p className="h4">Home Address</p></Col>
          {
            homeAddress.map(({id, ...otherProps}) => (
              <Col md={6}>
                <FormField id={id} data={otherProps} onChange={onChange} key={id} />
              </Col>
            ))
          }
        </Row>
        <Button>Submit</Button>
      </ReactStrapForm>
    </Fragment>
  )
}