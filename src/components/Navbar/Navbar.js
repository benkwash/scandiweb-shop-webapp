import { Component, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { setCurrency } from '../../services/redux/currencySlice';

import './Navbar.css';
import aLogo from '../../assets/icons/a-logo.svg';
import emptyCart from '../../assets/icons/empty-cart.svg';
import arrowDown from '../../assets/icons/arrow-down.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';

import Button from '../../components/Button';

class Navbar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showCurrencyTab: false,
         showCart: false,
         selectedNav: 0,
         currencyDropdownRef: createRef(),
         cartDropdownRef: createRef()
      };
   }
   selectCurrency = (selectedCurrency) => {
      this.props.setCurrency(selectedCurrency);
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
         cart = []
      } = this.props;

      const {
         showCurrencyTab,
         showCart,
         currencyDropdownRef,
         cartDropdownRef
      } = this.state;
      const currencyList = (
         <ul>
            {currencies.map(({ symbol, label }, index) => (
               <li key={index} onClick={() => this.selectCurrency(symbol)}>
                  {`${symbol} ${label}`}
               </li>
            ))}
         </ul>
      );

      const navBarLinks = categories.map((category, index) => {
         return (
            <div className="nav-items" key={`${index}-${category}`}>
               <NavLink
                  onClick={() =>
                     this.setState((state) => ({
                        ...state,
                        selectedNav: index
                     }))
                  }
                  to={`/products/${category}`}
                  className={({ isActive }) =>
                     `nav-text ${
                        isActive || index === this.state.selectedNav
                           ? 'nav-selected'
                           : ''
                     }`
                  }
                  children={({ isActive }) => (
                     <>
                        {category.toUpperCase()}
                        <div
                           className={`nav-bar ${
                              !isActive && index !== this.state.selectedNav
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

      const currencyTab = (
         <div
            ref={currencyDropdownRef}
            className="currency-group"
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
            <p className="hover-effect">
               {selectedCurrency}
               <span className="currency-ico">
                  {!showCurrencyTab && arrowDownIco}
                  {showCurrencyTab && arrowUpIco}
               </span>
            </p>
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

      const cartTab = (
         <div ref={cartDropdownRef} className="cart-icon-group">
            <p>
               <img
                  className="cart-icon hover-effect"
                  src={emptyCart}
                  alt="cart icon"
                  onClick={() => {
                     this.setState((state) => ({
                        showCart: !state.showCart,
                        showCurrencyTab: false
                     }));
                     this.listenToOutsideClick('showCart', currencyDropdownRef);
                  }}
               />
            </p>

            <div
               className={clsx({
                  'cart-badge': true,
                  'element-transition': true,
                  show: cart.length > 0
               })}
            >
               {cart.length}
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
                  {cart.length === 0 && <p>You have an empty cart.</p>}
               </div>
               <div className="cart-tab-buttons">
                  <Button
                     name={'VIEW BAG'}
                     onClick={() => {
                        //navigate to cart page
                     }}
                     variant={'secondary'}
                  />
                  <Button
                     name={'CHECK OUT'}
                     onClick={() => {
                        //checkout function
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
const mapStateToProps = ({ currency }) => ({ currency });
const mapDispatchToProps = { setCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
