import React, {Component} from 'react';
import {
  loadAdminModel,
  loadAllFeatures,
  loadErrors,
  loadingAllFeatures,
  loadMethods,
} from '../../actions/actions';
import {Button, Col, Grid, Row, Tab, Tabs} from 'react-bootstrap';
import './MainView.css';
import {connect} from 'react-redux';
import BaseFeatureList from '../BaseFeatureList/BaseFeatureList';
import AddBaseFeature from '../AddBaseFeature/AddBaseFeature';
import AddToPowTransform from '../AddToPowTransform/AddToPowTransform';
import ToPowTransformList from '../ToPowTransformList/ToPowTransformList';
import AddToLogTransform from '../AddToLogTransform/AddToLogTransform';
import ToLogTransformList from '../ToLogTransformList/ToLogTransformList';
import AddToBooleanTransform
  from '../AddToBooleanTransform/AddToBooleanTransform';
import ToBooleanTransformList
  from '../ToBooleanTransformList/ToBooleanTransformList';
import AddMethod from '../AddMethod/AddMethod';
import MethodList from '../MethodList/MethodList';
import ResponseArea from '../ResponseArea/ResponseArea';

class MainView extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.performLoading = this.performLoading.bind(this);
  }

  componentDidMount() {
    this.performLoading(this.props.dataset);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataset !== nextProps.dataset) {
      this.performLoading(nextProps.dataset);
    }
  }

  performLoading(dataset) {
    this.props.loadingAllFeatures();

    let {backend, username, password} = dataset;
    console.log('backend: ', backend);

    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic ' +
        btoa(username + ':' + password));

    let myInit = {
      headers: myHeaders,
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
    };

    fetch(backend + '/api/features', myInit).
        then(data => data.json()).
        then(data => {
          console.log('features: ', data);
          this.props.loadAllFeatures(data);

          fetch(backend + '/api/methods', myInit).
              then(data => data.json()).
              then(data => {
                console.log('methods: ', data);
                this.props.loadMethods(data);

                fetch(backend + '/api/admin_model', myInit).
                    then(data => data.json()).
                    then(data => {
                      console.log('admin_model: ', data);
                      this.props.loadAdminModel(data);
                    }).
                    catch(error => {
                      console.log('There has been a problem with your fetch operation: ' +
                          error.message);
                    });
              }).
              catch(error => {
                console.log('There has been a problem with your fetch operation: ' +
                    error.message);
              });
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
    let {backend, username, password} = this.props.dataset;

    console.log('trainObject: ', trainObject);

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic ' +
        btoa(username + ':' + password));

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
          this.props.loadErrors(data);
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });
  }

  render() {
    if (this.props.status === 'loading') {
      return (<h1>Loading...</h1>);
    }
    return (
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Tabs defaultActiveKey={1} id="main-tab">
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
        </Grid>);
  }
}

function mapStateToProps(state) {
  return {
    baseFeatures: state.featuresReducer.baseFeatures,
    toPowTransform: state.featuresReducer.toPowTransform,
    toLogTransform: state.featuresReducer.toLogTransform,
    toBooleanTransform: state.featuresReducer.toBooleanTransform,
    methods: state.methodsReducer.usedMethods,
    dataset: state.datasetReducer.dataset,
    status: state.loadReducer.status,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadErrors: (data) => {dispatch(loadErrors(data));},
    loadingAllFeatures: () => {dispatch(loadingAllFeatures());},
    loadAllFeatures: (data) => {dispatch(loadAllFeatures(data));},
    loadMethods: (data) => {dispatch(loadMethods(data));},
    loadAdminModel: (data) => {dispatch(loadAdminModel(data));},
  };
};

export default MainView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainView);
