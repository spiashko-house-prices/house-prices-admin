import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from '../../index';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {removeTrainMethod} from '../../actions/actions';
import './MethodList.css';

class MethodList extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

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
                      store.dispatch(removeTrainMethod(item.name))}>
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

function mapStateToProps(state) {
  return {
    usedMethods: state.methodsReducer.usedMethods,
  };
}

export default connect(mapStateToProps)(MethodList);