import React, {Component} from 'react';
import {
  addToBaseFeatures,
  changeSelectedBaseFeatures,
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
import './AddBaseFeature.css';

class AddBaseFeature extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

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
                      store.dispatch(
                          changeSelectedBaseFeatures(e.target.value))}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{textAlign: 'left'}}
                 lgOffset={2} lg={10} mdOffset={2} md={10} smOffset={2} sm={10}>
              <Button
                  className="AddMethod-button"
                  onClick={() => store.dispatch(addToBaseFeatures())}>
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
    features: state.featuresReducer.features,
    selectedValue: state.featuresReducer.selectedBaseFeature,
  };
}

export default connect(mapStateToProps)(AddBaseFeature);