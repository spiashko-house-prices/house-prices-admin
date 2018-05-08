import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import './ToLogTransformList.css';
import {removeFromToLogTransform} from '../../actions/actions';

class ToLogTransformList extends Component {
  render() {
    let {toLogTransform} = this.props;
    let itemList = toLogTransform.map((item, index) => (
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
                      this.props.removeFromToLogTransform(item)}>
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
    toLogTransform: state.featuresReducer.toLogTransform,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromToLogTransform: (value) =>
        dispatch(removeFromToLogTransform(value)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToLogTransformList);
