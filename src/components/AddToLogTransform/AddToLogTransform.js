import React, {Component} from 'react';
import {
  addToToLogTransform,
  changeSelectedToLogTransform,
} from '../../actions/actions';
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
                      this.props.
                          changeSelectedToLogTransform(e.target.value)}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  className="AddToLogTransform-button"
                  onClick={() => this.props.addToToLogTransform()}>
                Add
              </Button>
            </Col>
          </FormGroup>
        </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    availableForLogTransform: state.featuresReducer.availableForLogTransform,
    selectedValue: state.featuresReducer.selectedToLogTransform,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedToLogTransform: (value) =>
        dispatch(changeSelectedToLogTransform(value)),
    addToToLogTransform: () =>
        dispatch(addToToLogTransform()),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddToLogTransform);
