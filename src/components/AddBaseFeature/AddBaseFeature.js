import React, {Component} from 'react';
import {
  addToBaseFeatures,
  changeSelectedBaseFeatures,
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
import './AddBaseFeature.css';

class AddBaseFeature extends Component {
  render() {
    const {features, selectedValue} = this.props;

    const listOptions = features.map((value) =>
        <option key={value} value={value}>{value}</option>,
    );

    return (
        <Form horizontal className="AddBaseFeature">
          <FormGroup>
            <Col lg={2} md={2} sm={2}>
              <ControlLabel className="AddBaseFeature-label">
                Feature
              </ControlLabel>
            </Col>
            <Col lg={10} md={10} sm={10}>
              <FormControl
                  className="AddBaseFeature-select"
                  componentClass="select"
                  value={selectedValue}
                  onChange={(e) =>
                      this.props.changeSelectedBaseFeatures(e.target.value)}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  className="AddMethod-button"
                  onClick={() => this.props.addToBaseFeatures()}>
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
    features: state.featuresReducer.features,
    selectedValue: state.featuresReducer.selectedBaseFeature,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToBaseFeatures: () => dispatch(addToBaseFeatures()),
    changeSelectedBaseFeatures: (value) =>
        dispatch(changeSelectedBaseFeatures(value)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddBaseFeature);