import React, {Component} from 'react';
import './App.css';
import {store} from './index';
import {
  loadAllFeatures,
  loadErrors,
  loadingAllFeatures,
  loadMethods,
} from './actions/actions';
import {connect} from 'react-redux';
import AddBaseFeature from './components/AddBaseFeature/AddBaseFeature';
import BaseFeatureList from './components/BaseFeatureList/BaseFeatureList';
import {Button, Col, Grid, Row, Tab, Tabs} from 'react-bootstrap';
import ResponseArea from './components/ResponseArea/ResponseArea';
import AddMethod from './components/AddMethod/AddMethod';
import MethodList from './components/MethodList/MethodList';
import AddToPowTransform
  from './components/AddToPowTransform/AddToPowTransform';
import ToPowTransformList
  from './components/ToPowTransformList/ToPowTransformList';
import AddToLogTransform
  from './components/AddToLogTransform/AddToLogTransform';
import ToLogTransformList
  from './components/ToLogTransformList/ToLogTransformList';
import AddToBooleanTransform
  from './components/AddToBooleanTransform/AddToBooleanTransform';
import ToBooleanTransformList
  from './components/ToBooleanTransformList/ToBooleanTransformList';

const backend = process.env.REACT_APP_BACKEND;

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    store.dispatch(loadingAllFeatures());

    let myInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
    };

    fetch(backend + '/api/features', myInit).
        then(data => data.json()).
        then(data => {
          console.log('features: ', data);
          store.dispatch(loadAllFeatures(data));
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });

    fetch(backend + '/api/methods', myInit).
        then(data => data.json()).
        then(data => {
          console.log('methods: ', data);
          store.dispatch(loadMethods(data));
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });
  }

  handleClick() {

    let trainObject = {
      baseFeatures: this.props.baseFeatures,
      toPowTransform: this.props.toPowTransform,
      toLogTransform: this.props.toLogTransform,
      toBooleanTransform: this.props.toBooleanTransform,
      methods: this.props.methods,
    };

    console.log('trainObject: ', trainObject);

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'no-store',
      body: JSON.stringify(trainObject),
    };

    fetch(backend + '/api/train', myInit).
        then(data => data.json()).
        then(data => {
          console.log('errors: ', data);
          store.dispatch(loadErrors(data));
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });
  }

  render() {

    if (this.props.status === 'empty') return null;
    if (this.props.status === 'loading') {
      return (
          <h1>Loading...</h1>
      );
    }

    return (
        <div className="App">
          <header className="App-header">
          </header>
          <Grid>
            <Row>
              <Col md={10} mdOffset={1}>
                <Tabs defaultActiveKey={4} id="main-tab">
                  <Tab eventKey={1} title="Base Features">
                    <Row>
                      <Col md={8} mdOffset={2}>
                        <AddBaseFeature/>
                        <BaseFeatureList/>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey={2} title="To Pow Transform">
                    <Row>
                      <Col md={8} mdOffset={2}>
                        <AddToPowTransform/>
                        <ToPowTransformList/>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey={3} title="To Log Transform">
                    <Row>
                      <Col md={8} mdOffset={2}>
                        <AddToLogTransform/>
                        <ToLogTransformList/>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey={4} title="To Boolean Transform">
                    <Row>
                      <Col md={8} mdOffset={2}>
                        <AddToBooleanTransform/>
                        <ToBooleanTransformList/>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey={5} title="Methods">
                    <Row>
                      <Col md={8} mdOffset={2}>
                        <AddMethod/>
                        <MethodList/>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
            <Row>
              <Col md={6} mdOffset={3}>
                <Button bsSize="large" bsStyle="primary"
                        onClick={this.handleClick}>
                  Train
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={6} mdOffset={3}>
                <ResponseArea/>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.loadReducer.status,
    baseFeatures: state.featuresReducer.baseFeatures,
    toPowTransform: state.featuresReducer.toPowTransform,
    toLogTransform: state.featuresReducer.toLogTransform,
    toBooleanTransform: state.featuresReducer.toBooleanTransform,
    methods: state.methodsReducer.usedMethods,
  };
}

export default connect(mapStateToProps)(App);
