import React, {Component} from 'react';
import {changeDataset} from '../../actions/actions';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import './MyNavBar.css';
import {connect} from 'react-redux';

class MyNavBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a>HP-Admin</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={() => {
                this.props.changeDataset('ames');
              }}>
                Ames
              </NavItem>
              <NavItem eventKey={2} onClick={() => {
                this.props.changeDataset('kc');
              }}>
                King County
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeDataset: (data) => {dispatch(changeDataset(data));},
  };
};

export default MyNavBar = connect(
    null,
    mapDispatchToProps,
)(MyNavBar);
