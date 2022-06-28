import { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.css';

import CartItem from '../../components/CartItem';
import Button from '../../components/Button';

import { getCartDetails } from '../../services/helpers/generalHelper';
import { resetCart } from '../../services/redux/cartSlice';

class Cart extends Component {
   checkoutCart = async () => {
      //send data to the graph endpoint
      //if successful
      this.props.resetCart();
   };

   render() {
      const { cart, currency, isCartTab = false } = this.props;
      const cartItems = cart.map((product, index) => (
         <div key={`${index}-${product.name}`}>
            {!isCartTab && <hr></hr>}
            <CartItem
               product={product}
               cartIndex={index}
               isCartPage={true}
               isCartTab={isCartTab}
               key={`${product.productDetails.name}-${product.productDetails.quantity}-${index}`}
            />
            {index === cart.length - 1 && !isCartTab && <hr></hr>}
         </div>
      ));

      const { totalQuantity, subTotal, taxPercentage, tax, totalCost } =
         getCartDetails(cart, currency);

      return (
         <div className="cart-page">
            {!isCartTab && <h3 className="cart-page-title">CART</h3>}

            {cartItems}
            {!isCartTab && totalQuantity < 1 && <h3>Your cart is empty</h3>}
            {!isCartTab && totalQuantity > 0 && (
               <div className="cart-details">
                  <table>
                     <tbody>
                        <tr>
                           <td>Tax {taxPercentage}%:</td>
                           <td>
                              {' '}
                              {currency}
                              {tax}
                           </td>
                        </tr>
                        <tr>
                           <td>Quantity:</td>
                           <td>{totalQuantity}</td>
                        </tr>
                        <tr>
                           <td>Sub-total:</td>
                           <td>
                              {currency}
                              {subTotal}
                           </td>
                        </tr>
                        <tr>
                           <td className="total">Total:</td>
                           <td>
                              {currency}
                              {totalCost}
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <Button name={'Order'} onClick={() => this.checkoutCart()} />
               </div>
            )}
         </div>
      );
   }
}
const mapStateToProps = ({ cart, currency }) => ({ cart, currency });
const mapDispatchToProps = { resetCart };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
