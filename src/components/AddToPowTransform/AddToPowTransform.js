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
                      this.props.
                          changeSelectedToPowTransform(e.target.value)}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  className="AddToPowTransform-button"
                  onClick={() => this.props.addToToPowTransform()}>
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

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedToPowTransform: (value) =>
        dispatch(changeSelectedToPowTransform(value)),
    addToToPowTransform: () =>
        dispatch(addToToPowTransform()),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddToPowTransform);
