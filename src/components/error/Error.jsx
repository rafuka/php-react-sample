import React, { Component } from 'react';
import './error.scss';

class Error extends Component {
  render() {
    return (
      <div className="error">
        <img className="error__image" src="./error-img.png" alt="Error" />
        <h2>Woops! There's been an error :(</h2>
        {this.props.message
          ? (
            <p className="error__message">{this.props.message}</p>
          )
          : null}
      </div>
    );
  }
}

export default Error;