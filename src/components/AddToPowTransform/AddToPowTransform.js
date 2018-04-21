import React, {Component} from 'react';
import {
  addToToPowTransform,
  changeSelectedToPowTransform,
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
import './AddToPowTransform.css';

class AddToPowTransform extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const {availableForPowTransform, selectedValue} = this.props;

    const listOptions = availableForPowTransform.map((value) =>
        <option key={value} value={value}>{value}</option>,
    );

    return (
        <Form horizontal className="AddToPowTransform">
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddToPowTransform-label">
                Feature
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddToPowTransform-select"
                  componentClass="select"
                  value={selectedValue}
                  onChange={(e) =>
                      store.dispatch(
                          changeSelectedToPowTransform(e.target.value))}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  className="AddToPowTransform-button"
                  onClick={() => store.dispatch(addToToPowTransform())}>
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
    availableForPowTransform: state.featuresReducer.availableForPowTransform,
    selectedValue: state.featuresReducer.selectedToPowTransform,
  };
}

export default connect(mapStateToProps)(AddToPowTransform);