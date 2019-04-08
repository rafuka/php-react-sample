import React, { Component } from 'react';
import './modal.scss';

class Modal extends Component {
  state = {
    visible: false
  }

  handleToggle = (e) => {
    e.preventDefault();
    this.setState(
      ({ visible }) => ({ visible: !visible }),
      () => {
        const { onToggle } = this.props;
        if (onToggle) onToggle(this.state.visible)  
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal.Toggler handleToggle={this.handleToggle}>
          {this.props.toggler}
        </Modal.Toggler>
        <Modal.Body visible={this.state.visible}>
          <Modal.Toggler handleToggle={this.handleToggle}>
            {({toggle}) => <button onClick={toggle} className="modal__close">X</button>}
          </Modal.Toggler>
          {this.props.children}
        </Modal.Body>
      </React.Fragment>
    );
  }

  static Toggler = props => { // All the children of this element will act as togglers on click
    return props.children({
      toggle: props.handleToggle
    })
  }

  static Body = props => {
    const { visible } = props;
    let modalVisibleClass = visible ? ' visible' : '';
    return (
      <div className={"modal" + modalVisibleClass}>
        <div className="modal__container">   
          {props.children}
        </div>
      </div>
    );
  }
}
 
export default Modal;