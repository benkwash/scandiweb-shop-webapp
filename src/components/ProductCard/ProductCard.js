import { Component } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import './ProductCard.css';
import cartIco from '../../assets/icons/green-cart.svg';
import { addProductToCart } from '../../services/redux/cartSlice';
import { getProductDescription } from '../../services/graphql/requests';

class ProductCard extends Component {
   fetchProductDetailsAndAddToCart = async () => {
      const {
         data: { product }
      } = await getProductDescription(this.props.productId);
      const { name, attributes, brand, gallery, description, prices } = product;

      const selectedAttributes = attributes.map(({ id, name, items }) => {
         return {
            id,
            name,
            selectedAttribute: items[0]?.id
         };
      });
      this.props.addProductToCart({
         brand,
         name,
         attributes,
         selectedAttributes,
         gallery,
         description,
         prices
      });
   };
   addProductToCart = (e) => {
      e.stopPropagation();
      this.fetchProductDetailsAndAddToCart();
   };

   render() {
      const { image, name, price, currency, inStock, goToProduct, brand } =
         this.props;
      return (
         <div
            className="product-card cursor-pointer"
            onClick={() => goToProduct()}
         >
            <div className="product-image">
               <img src={image} alt={name}></img>
               {inStock && (
                  <img
                     className="green-cart-icon cursor-pointer hover-effect"
                     src={cartIco}
                     alt="cart icon"
                     onClick={(e) => this.addProductToCart(e)}
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
               <h5 className="product-name">{`${brand} ${name}`}</h5>
               <h3 className="product-price">
                  {currency}
                  {price}
               </h3>
            </div>
         </div>
      );
   }
}

const mapDispatchToProps = { addProductToCart };

export default connect(null, mapDispatchToProps)(ProductCard);
