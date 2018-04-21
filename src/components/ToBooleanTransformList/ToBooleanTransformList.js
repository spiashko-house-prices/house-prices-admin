import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from '../../index';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {removeFromToBooleanTransform} from '../../actions/actions';
import './ToBooleanTransformList.css';

class ToBooleanTransformList extends Component {
  constructor() {
    super();
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    let {toBooleanTransform} = this.props;
    let itemList = toBooleanTransform.map((item, index) => (
        <ListGroupItem key={index}>
          <Row>
            <Col sm={4} md={4} lg={4}>
              name: {item.featureName}
            </Col>
            <Col sm={3} md={3} lg={3}>
              new name: {item.newFeatureName}
            </Col>
            <Col sm={3} md={3} lg={3}>
              threshold: {item.threshold}
            </Col>
            <Col sm={2} md={2} lg={2}>
              <Button
                  bsSize="xsmall"
                  bsStyle="danger"
                  onClick={() =>
                      store.dispatch(
                          removeFromToBooleanTransform(item.featureName))}>
                Delete
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
    ));

    return (
        <ListGroup className="ToBooleanTransformList">
          {itemList}
        </ListGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    toBooleanTransform: state.featuresReducer.toBooleanTransform,
  };
}

export default connect(mapStateToProps)(ToBooleanTransformList);