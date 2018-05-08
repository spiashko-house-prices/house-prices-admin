import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import './ToPowTransformList.css';
import {removeFromToPowTransform} from '../../actions/actions';

class ToPowTransformList extends Component {
  render() {
    let {toPowTransform} = this.props;
    let itemList = toPowTransform.map((item, index) => (
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
                      this.props.removeFromToPowTransform(item)}>
                Delete
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
    ));

    return (
        <ListGroup className="ToPowTransformList">
          {itemList}
        </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    toPowTransform: state.featuresReducer.toPowTransform,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromToPowTransform: (value) =>
        dispatch(removeFromToPowTransform(value)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToPowTransformList);
