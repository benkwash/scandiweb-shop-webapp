import { Component } from 'react';
import clsx from 'clsx';

import './ProductAttributes.css';

class ProductAttributes extends Component {
   render() {
      const {
         attributes: { items, name },
         selectedAttribute,
         selectAttribute = () => {},
         isCartPage = false
      } = this.props;

      const isAttrColor = name === 'Color';
      const attributesItems = items.map((item, index) => (
         <button
            key={`${index}-${item.id}`}
            className={clsx({
               'selected-item': item.id === selectedAttribute,
               items: true,
               'other-attr': !isAttrColor,
               'color-attr': isAttrColor,
               'hover-effect': true,
               'cursor-pointer': !isCartPage
            })}
            onClick={() => selectAttribute(name, item.id)}
         >
            {!isAttrColor && <h3>{item.value}</h3>}
            {isAttrColor && <div style={{ backgroundColor: item.value }}></div>}
         </button>
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
