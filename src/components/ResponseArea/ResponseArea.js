import React, {Component} from 'react';
import './ResponseArea.css';
import {connect} from 'react-redux';
import {Well} from 'react-bootstrap';

class ResponseArea extends Component {
  render() {
    const errors = this.props.errors;
    let inside = '';

    if (errors != null) {
      let errorList = errors.errorsPerTrainer.map((item, index) => (
          <p key={index}>{item.name}: {parseFloat(item.error).toFixed(3)}</p>
      ));
      inside = (
          <div>
            <div style={{
              textAlign: 'left',
              fontSize: 'medium',
            }}>{errorList}</div>
            <p>Final error: {parseFloat(errors.finalError).toFixed(3)}</p>
          </div>
      );
    }
    else {
      inside = 'Please fill form and click Train';
    }

    return (
        <Well className="ResponseArea" bsSize="large">{inside}</Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.loadErrorsReducer.errors,
  };
}

export default connect(mapStateToProps)(ResponseArea);