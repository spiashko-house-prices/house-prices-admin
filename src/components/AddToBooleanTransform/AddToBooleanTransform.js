import React, {Component} from 'react';
import {
  addToToBooleanTransform,
  changeSelectedToBooleanTransform,
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
import './AddToBooleanTransform.css';

class AddToBooleanTransform extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const {availableForBooleanTransform, selectedValue} = this.props;

    const listOptions = availableForBooleanTransform.map((value) =>
        <option key={value} value={value}>{value}</option>,
    );
    return (
        <Form
            onSubmit={(e) => {
              e.preventDefault();
              store.dispatch(
                  addToToBooleanTransform(this.inputNewName.value,
                      parseFloat(this.inputThreshold.value)));
            }}
            horizontal
            className="AddToBooleanTransform">
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddToBooleanTransform-select-label">
                Feature
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddToBooleanTransform-select"
                  componentClass="select"
                  value={selectedValue}
                  onChange={(e) =>
                      store.dispatch(
                          changeSelectedToBooleanTransform(e.target.value))}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddToBooleanTransform-newName-label">
                New name
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddToBooleanTransform-newName"
                  required
                  pattern="[A-Za-z0-9]+"
                  title="[A-Za-z0-9]+"
                  inputRef={inputText => this.inputNewName = inputText}
                  type="text"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddToBooleanTransform-threshold-label">
                Threshold
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddToBooleanTransform-threshold"
                  required
                  min={0}
                  defaultValue={0}
                  step={0.01}
                  inputRef={inputNumber => this.inputThreshold = inputNumber}
                  type="number"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  type="submit"
                  className="AddToBooleanTransform-button">
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
    availableForBooleanTransform: state.featuresReducer.availableForBooleanTransform,
    selectedValue: state.featuresReducer.selectedToBooleanTransform,
  };
}

export default connect(mapStateToProps)(AddToBooleanTransform);