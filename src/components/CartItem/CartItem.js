import { Component } from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import './CartItem.css';

//components
import Attributes from '../ProductAttributes';
import ImageCarousal from '../ImageCarousal';

//services
import { getAmount } from '../../services/helpers/generalHelper';
import { updateProduct, removeProduct } from '../../services/redux/cartSlice';

//icons
import quantityAdd from '../../assets/icons/cart-plus.svg';
import quantityMinus from '../../assets/icons/cart-minus.svg';

class Cart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentImage: props.product?.productDetails?.gallery[0]
      };
   }
   selectAttribute = (attributeId, selectedAttribute, cartIndex) => {
      //not needed here after reading the test FAQs
      //stil leaving this here just in case
      // const product = cloneDeep(this.props.cart[cartIndex]);
      // const attrIndex = product.productDetails.selectedAttributes.findIndex(
      //    (attr) => attr.id === attributeId
      // );
      // product.productDetails.selectedAttributes[attrIndex].selectedAttribute =
      //    selectedAttribute;
      // this.props.updateProduct({ cartIndex, update: product });
   };
   updateProductQuantity = (cartIndex, action) => {
      const product = cloneDeep(this.props.cart[cartIndex]);
      product.quantity += action === 'add' ? 1 : -1;
      if (product.quantity < 1) {
         this.props.removeProduct({ cartIndex });
      } else {
         this.props.updateProduct({ cartIndex, update: product });
      }
   };
   render() {
      const {
         currency,
         product: { quantity, productDetails },
         cartIndex,
         isCartTab
      } = this.props;
      let amount = getAmount(productDetails.prices, currency);
      amount = Number.parseFloat(amount).toFixed(2);
      return (
         <div className="cart-item-container">
            <div className="left-items">
               <h2 className="item-brand">{productDetails.brand}</h2>
               <h1 className="item-name">{productDetails.name}</h1>
               <h3 className="item-amount">
                  {currency}
                  {amount}
               </h3>
               {productDetails.attributes.map((attribute, index) => {
                  const selectedAttribute =
                     productDetails.selectedAttributes.find(
                        (attr) => attribute.id === attr.id
                     )?.selectedAttribute;
                  return (
                     <Attributes
                        key={`${selectedAttribute}-${index}`}
                        attributes={attribute}
                        selectedAttribute={selectedAttribute}
                        isCartPage={true}
                     />
                  );
               })}
            </div>

            <div className="right-items">
               <div className="cart-quantity-controls">
                  <img
                     className="cursor-pointer"
                     onClick={() =>
                        this.updateProductQuantity(cartIndex, 'add')
                     }
                     src={quantityAdd}
                     alt="increase-quantity-ico"
                  />
                  <h4 className="quantity">{quantity}</h4>
                  <img
                     className="cursor-pointer"
                     onClick={() =>
                        this.updateProductQuantity(cartIndex, 'subtract')
                     }
                     src={quantityMinus}
                     alt="reduce-quantity-ico"
                  />
               </div>
               <ImageCarousal
                  gallery={productDetails.gallery}
                  isCartTab={isCartTab}
               />
            </div>
         </div>
      );
   }
}
const mapStateToProps = ({ currency, cart }) => ({ currency, cart });
const mapDispatchToProps = {
   updateProduct,
   removeProduct
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
