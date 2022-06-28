import { Component, createRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';

import './Navbar.css';

import { setCurrency } from '../../services/redux/currencySlice';
import { resetCart } from '../../services/redux/cartSlice';
import { getCartDetails } from '../../services/helpers/generalHelper';

import aLogo from '../../assets/icons/a-logo.svg';
import emptyCart from '../../assets/icons/empty-cart.svg';
import arrowDown from '../../assets/icons/arrow-down.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';

import Cart from '../../pages/Cart';
import Button from '../../components/Button';

class Navbar extends Component {
   constructor(props) {
      super(props);
      // const navItem = localStorage.getItem('scandiweb-selected-nav');
      // const selectedNav = navItem ? Number.parseInt(navItem, 10) : null;
      this.state = {
         showCurrencyTab: false,
         showCart: false,
         // selectedNav,
         currencyDropdownRef: createRef(),
         cartDropdownRef: createRef()
      };
   }
   selectCurrency = (selectedCurrency) => {
      this.props.setCurrency(selectedCurrency);
      this.setState((state) => ({
         showCurrencyTab: false
      }));
   };

   listenToOutsideClick = (stateValue, ref) => {
      const handleOutsideClick = (event) => {
         if (!ref?.current?.contains(event.target)) {
            this.setState(() => ({
               [stateValue]: false
            }));
            document.removeEventListener('mousedown', handleOutsideClick);
         }
      };
      document.addEventListener('mousedown', handleOutsideClick);
   };

   render() {
      const {
         categories,
         currencies = [],
         currency: selectedCurrency,
         cart = [],
         resetCart,
         setNavIndex,
         selectedNav
      } = this.props;

      const {
         showCurrencyTab,
         showCart,
         currencyDropdownRef,
         cartDropdownRef
      } = this.state;

      const navBarLinks = categories.map((category, index) => {
         return (
            <div className="nav-items" key={`${index}-${category}`}>
               <NavLink
                  onClick={() => setNavIndex(index)}
                  to={`/products/${category}`}
                  className={({ isActive }) =>
                     `nav-text ff-raleway ${
                        isActive || (index != null && index === selectedNav)
                           ? 'nav-selected'
                           : ''
                     }`
                  }
                  children={({ isActive }) => (
                     <>
                        {category.toUpperCase()}
                        <div
                           className={`nav-bar ${
                              !isActive && index !== selectedNav
                                 ? 'bar-hidden'
                                 : ''
                           }`}
                        ></div>
                     </>
                  )}
               ></NavLink>
            </div>
         );
      });
      const arrowDownIco = (
         <img className="arrow-icon" src={arrowDown} alt="arrow down icon" />
      );
      const arrowUpIco = (
         <img className="arrow-icon" src={arrowUp} alt="arrow up icon" />
      );

      const currencyList = (
         <ul>
            {currencies.map(({ symbol, label }, index) => (
               <li
                  className="ff-raleway"
                  key={index}
                  onClick={() => this.selectCurrency(symbol)}
               >
                  {`${symbol} ${label}`}
               </li>
            ))}
         </ul>
      );

      const currencyTab = (
         <div ref={currencyDropdownRef} className="currency-group">
            <div
               className="hover-effect currency-btn-group"
               onClick={(e) => {
                  this.setState((state) => ({
                     showCurrencyTab: !state.showCurrencyTab,
                     showCart: false
                  }));
                  this.listenToOutsideClick(
                     'showCurrencyTab',
                     currencyDropdownRef
                  );
               }}
            >
               <h4 className="ff-raleway">{selectedCurrency}</h4>
               <div className="currency-ico">
                  {!showCurrencyTab && arrowDownIco}
                  {showCurrencyTab && arrowUpIco}
               </div>
            </div>

            <div
               className={clsx({
                  'currency-list': true,
                  'element-transition': true,
                  show: showCurrencyTab
               })}
            >
               {currencyList}
            </div>
         </div>
      );

      const { totalQuantity, totalCost } = getCartDetails(
         cart,
         selectedCurrency
      );

      const cartTab = (
         <div ref={cartDropdownRef} className="cart-group">
            <div
               className="cart-btn-group  hover-effect"
               onClick={() => {
                  this.setState((state) => ({
                     showCart: !state.showCart,
                     showCurrencyTab: false
                  }));
                  this.listenToOutsideClick('showCart', cartDropdownRef);
               }}
            >
               <img className="cart-icon" src={emptyCart} alt="cart icon" />

               <div
                  className={clsx({
                     'cart-badge': true,
                     'element-transition': true,
                     show: cart.length > 0,
                     'ff-roboto': true
                  })}
               >
                  {totalQuantity}
               </div>
            </div>

            <div
               className={clsx({
                  'cart-tab': true,
                  'element-transition': true,
                  show: showCart
               })}
            >
               <div className="cart-content">
                  {/* cart tab info comes here */}
                  {cart.length > 0 && (
                     <>
                        <div className="cart-detail">
                           <h4 className="title ff-roboto">My Bag, </h4>
                           <h4 className="value ff-raleway">
                              {totalQuantity} items
                           </h4>
                        </div>
                        <Cart isCartTab={true} />
                     </>
                  )}
                  {cart.length === 0 && <p>You have an empty cart.</p>}
               </div>
               <div className="cart-total">
                  <h4 className="title ff-roboto">Total</h4>
                  <h4 className="value ff-raleway">
                     {selectedCurrency}
                     {totalCost}
                  </h4>
               </div>
               <div className="cart-tab-buttons">
                  <Link to={'/cart'}>
                     <Button
                        name={'VIEW BAG'}
                        variant={'secondary'}
                        onClick={() => {
                           this.setState((state) => ({
                              showCart: !state.showCart,
                              showCurrencyTab: false
                           }));
                        }}
                     />
                  </Link>
                  <Button
                     name={'CHECK OUT'}
                     onClick={() => {
                        //checkout function
                        //send data to api
                        //then
                        resetCart();
                     }}
                  />
               </div>
            </div>
         </div>
      );
      return (
         <>
            <nav>
               <div className="navigation">{navBarLinks}</div>

               <img className="logo-icon-home" src={aLogo} alt="logo icon" />
               <div className="actions-tab">
                  {currencyTab}
                  {cartTab}
               </div>
            </nav>
            <div
               className={clsx({
                  'main-body-overlay': true,
                  'element-transition': true,
                  show: showCart
               })}
            ></div>
         </>
      );
   }
}
const mapStateToProps = ({ currency, cart }) => ({ currency, cart });
const mapDispatchToProps = { setCurrency, resetCart };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
