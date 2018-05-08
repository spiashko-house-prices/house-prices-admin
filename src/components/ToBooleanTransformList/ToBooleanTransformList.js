import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import {removeFromToBooleanTransform} from '../../actions/actions';
import './ToBooleanTransformList.css';

class ToBooleanTransformList extends Component {
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
                      this.props.
                          removeFromToBooleanTransform(item.featureName)}>
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

const mapStateToProps = state => {
  return {
    toBooleanTransform: state.featuresReducer.toBooleanTransform,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromToBooleanTransform: (value) =>
        dispatch(removeFromToBooleanTransform(value)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToBooleanTransformList);
