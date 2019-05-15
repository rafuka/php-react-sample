import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './button.scss';

class Button extends Component {
  render() { 
    const { icon, rounded, danger, className, text, ...rest } = this.props;
    const classes = ['btn'].concat(className ? className.split(' ') : []);

    if (icon) classes.push('btn-with-icon');
    if (rounded) classes.push('btn-rounded');
    if (danger) classes.push('btn-danger');
    if (!text && icon) classes.push('btn-no-text');

    return (
      <button className={classes.join(' ')} {...rest}>
        {icon && <Icon className="icon" icon={icon} />}
        {text}
      </button>
    );
  }
}
 
export default Button;