import React, {Component} from 'react';
import {
  addTrainMethod,
  changeSelectedTrainMethod,
  changeSelectedTrainValue,
} from '../../actions/actions';
import {store} from '../../index';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import {connect} from 'react-redux';
import './AddMethod.css';

class AddMethod extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const {availableMethods, selectedMethod, selectedValue, remainingPercentages} = this.props;

    const listOptions = availableMethods.map((value) =>
        <option key={value} value={value}>{value}</option>,
    );
    return (
        <Form horizontal className="AddMethod">
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddMethod-select-label">
                Method
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddMethod-select"
                  componentClass="select"
                  value={selectedMethod}
                  onChange={(e) =>
                      store.dispatch(
                          changeSelectedTrainMethod(e.target.value))}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddMethod-input-label">
                Value
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddMethod-input"
                  min={0}
                  value={selectedValue}
                  max={remainingPercentages}
                  step={0.01}
                  onChange={() => {
                    if (this.inputNumber.value <= remainingPercentages) {
                      store.dispatch(
                          changeSelectedTrainValue(
                              this.inputNumber.value === '' ?
                                  0 : parseFloat(this.inputNumber.value)));
                    }
                    else {
                      this.inputNumber.value = remainingPercentages;
                    }
                  }}
                  inputRef={inputNumber => this.inputNumber = inputNumber}
                  type="number"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  className="AddMethod-button"
                  onClick={() => store.dispatch(addTrainMethod())}>
                Add
              </Button>
            </Col>
          </FormGroup>
        </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableMethods: state.methodsReducer.availableMethods,
    selectedMethod: state.methodsReducer.selectedMethod,
    selectedValue: state.methodsReducer.selectedValue,
    remainingPercentages: state.methodsReducer.remainingPercentages,
  };
}

export default connect(mapStateToProps)(AddMethod);