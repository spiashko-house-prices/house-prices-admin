import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {removeTrainMethod} from '../../actions/actions';
import './MethodList.css';

class MethodList extends Component {
  render() {
    let {usedMethods} = this.props;
    let itemList = usedMethods.map((item, index) => (
        <ListGroupItem key={index}>
          <Row>
            <Col sm={7} md={7} lg={7}>
              name: {item.name}
            </Col>
            <Col sm={3} md={3} lg={3}>
              value: {item.value}
            </Col>
            <Col sm={2} md={2} lg={2}>
              <Button
                  bsSize="xsmall"
                  bsStyle="danger"
                  onClick={() =>
                      this.props.removeTrainMethod(item.name)}>
                Delete
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
    ));

    return (
        <ListGroup className="MethodList">
          {itemList}
        </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    usedMethods: state.methodsReducer.usedMethods,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeTrainMethod: (value) =>
        dispatch(removeTrainMethod(value)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MethodList);
