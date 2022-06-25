import { Component } from 'react';
import clsx from 'clsx';

import './ProductCard.css';
import cartIco from '../../assets/icons/green-cart.svg';

class ProductCard extends Component {
   render() {
      const { image, name, price, currency, inStock, goToProduct } = this.props;
      return (
         <div className="product-card">
            <div className="product-image">
               <img src={image} alt={name}></img>
               {inStock && (
                  <img
                     className="green-cart-icon cursor-pointer hover-effect"
                     src={cartIco}
                     alt="cart icon"
                     style={{
                        width: '55px',
                        height: '55px'
                     }}
                     onClick={() => goToProduct()}
                  ></img>
               )}
               {!inStock && (
                  <h4 className="out-of-stock center-xy">OUT OF STOCK</h4>
               )}
               <div
                  className={clsx({
                     'img-overlay': true,
                     'o-out-of-stock': !inStock
                  })}
               ></div>
            </div>
            <div className="product-content">
               <h5 className="product-name">{name}</h5>
               <h3 className="product-price">
                  {currency}
                  {price}
               </h3>
            </div>
         </div>
      );
   }
}
export default ProductCard;
