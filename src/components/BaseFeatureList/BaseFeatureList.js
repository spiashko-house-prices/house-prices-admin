import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {removeFromBaseFeatures} from '../../actions/actions';
import './BaseFeatureList.css';

class BaseFeatureList extends Component {
  render() {
    let {baseFeatures} = this.props;
    let itemList = baseFeatures.map((item, index) => (
        <ListGroupItem key={index}>
          <Row>
            <Col sm={10} md={10} lg={10}>
              name: {item}
            </Col>
            <Col sm={2} md={2} lg={2}>
              <Button
                  bsSize="xsmall"
                  bsStyle="danger"
                  onClick={() =>
                      this.props.removeFromBaseFeatures(item)}>
                Delete
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
    ));

    return (
        <ListGroup className="BaseFeatureList">
          {itemList}
        </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    baseFeatures: state.featuresReducer.baseFeatures,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromBaseFeatures: (value) =>
        dispatch(removeFromBaseFeatures(value)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BaseFeatureList);