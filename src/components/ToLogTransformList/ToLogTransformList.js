import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from '../../index';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import './ToLogTransformList.css';
import {removeFromToLogTransform} from '../../actions/actions';

class ToLogTransformList extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

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
                      store.dispatch(removeFromToLogTransform(item))}>
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

function mapStateToProps(state) {
  return {
    toLogTransform: state.featuresReducer.toLogTransform,
  };
}

export default connect(mapStateToProps)(ToLogTransformList);