import { Component } from 'react';
import clsx from 'clsx';

import './ProductAttributes.css';

class ProductAttributes extends Component {
   render() {
      const {
         attributes: { items, name },
         selectedAttribute,
         selectAttribute
      } = this.props;

      const isOtherAttr = name !== 'Color';
      const isAttrColor = name === 'Color';
      const attributesItems = items.map((item, index) => (
         <div
            key={`${index}-${item.id}`}
            className={clsx({
               'selected-item': item.id === selectedAttribute,
               items: true,
               'other-attr': isOtherAttr,
               'color-attr': isAttrColor,
               'hover-effect': true
            })}
            onClick={() => selectAttribute(name, item.id)}
         >
            {isOtherAttr && <h3 className="center-xy">{item.value}</h3>}
            {isAttrColor && <div style={{ backgroundColor: item.value }}></div>}
         </div>
      ));
      return (
         <div>
            <h3 className="attr-title">{`${name.toUpperCase()}:`}</h3>
            <div className="attribute-items">{attributesItems}</div>
         </div>
      );
   }
}

export default ProductAttributes;
