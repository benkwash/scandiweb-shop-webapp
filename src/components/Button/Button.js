import { Component } from 'react';
import clsx from 'clsx';

import './Button.css';

class Button extends Component {
   render() {
      const {
         name,
         type = 'button',
         onClick = () => {},
         variant = 'primary',
         disabled = false
      } = this.props;
      return (
         <button
            type={type}
            onClick={() => onClick()}
            className={clsx('reusable-btn', 'cursor-pointer', variant, {
               disabled
            })}
            disabled={disabled}
         >
            {name}
         </button>
      );
   }
}

export default Button;
