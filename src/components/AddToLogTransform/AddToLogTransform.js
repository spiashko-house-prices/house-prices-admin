import React, {Component} from 'react';
import {
  addToToLogTransform,
  changeSelectedToLogTransform,
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
import './AddToLogTransform.css';

class AddToLogTransform extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const {availableForLogTransform, selectedValue} = this.props;

    const listOptions = availableForLogTransform.map((value) =>
        <option key={value} value={value}>{value}</option>,
    );

    return (
        <Form horizontal className="AddToLogTransform">
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddToLogTransform-label">
                Feature
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddToLogTransform-select"
                  componentClass="select"
                  value={selectedValue}
                  onChange={(e) =>
                      store.dispatch(
                          changeSelectedToLogTransform(e.target.value))}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  className="AddToLogTransform-button"
                  onClick={() => store.dispatch(addToToLogTransform())}>
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
    availableForLogTransform: state.featuresReducer.availableForLogTransform,
    selectedValue: state.featuresReducer.selectedToLogTransform,
  };
}

export default connect(mapStateToProps)(AddToLogTransform);