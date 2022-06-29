import { Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import './styles/externalStyles.css';
import './styles/generalStyles.css';
import './App.css';

import { store } from './services/redux/store';
import apolloClient from './services/graphql/apolloSetup';

//components
import Navbar from './components/Navbar';
import Products from './pages/ProductListing';

//routes
import AllRoutes from './routes/mainRoutes';

//services
import { getCategoriesAndCurrencies } from './services/graphql/requests';
import { setCurrency } from './services/redux/currencySlice';

class App extends Component {
   constructor() {
      super();
      const navItem = localStorage.getItem('scandiweb-selected-nav');
      const selectedNav = navItem ? Number.parseInt(navItem, 10) : 0;
      this.state = {
         categories: [],
         currencies: [],
         selectedNav
      };
   }

   async componentDidMount() {
      const {
         data: { categories, currencies }
      } = await getCategoriesAndCurrencies();
      this.setState((state) => ({
         categories: categories.map(({ name }) => name) || [],
         currencies:
            currencies.map(({ symbol, label }) => ({ symbol, label })) || []
      }));

      const defaultCurrency = this.props.currency || currencies[0].symbol || '';
      this.props.setCurrency(defaultCurrency);
   }

   setNav = (navIndex) => {
      this.setState(() => ({
         selectedNav: navIndex
      }));
      localStorage.setItem('scandiweb-selected-nav', navIndex);
   };

   render() {
      if (!this.state.categories.length > 0) return <></>;
      return (
         <div className="App">
            <div className="header">
               <Navbar {...this.state} setNavIndex={this.setNav} />
            </div>
            <div className="main-body">
               <Outlet />
               <Routes>
                  <Route
                     index
                     element={
                        <Products
                           firstCategory={
                              this.state.categories[this.state.selectedNav || 0]
                           }
                        />
                     }
                  />
                  {AllRoutes}
               </Routes>
            </div>
         </div>
      );
   }
}

const mapStateToProps = ({ currency }) => ({ currency });
const mapDispatchToProps = { setCurrency };

App = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWithProviders extends Component {
   render() {
      return (
         <ApolloProvider client={apolloClient}>
            <Provider store={store}>
               <BrowserRouter>
                  <App />
               </BrowserRouter>
            </Provider>
         </ApolloProvider>
      );
   }
}
export default AppWithProviders;
