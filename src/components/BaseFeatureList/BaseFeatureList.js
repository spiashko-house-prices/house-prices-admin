import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from '../../index';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {removeFromBaseFeatures} from '../../actions/actions';
import './BaseFeatureList.css';

class BaseFeatureList extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

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
                      store.dispatch(removeFromBaseFeatures(item))}>
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

function mapStateToProps(state) {
  return {
    baseFeatures: state.featuresReducer.baseFeatures,
  };
}

export default connect(mapStateToProps)(BaseFeatureList);