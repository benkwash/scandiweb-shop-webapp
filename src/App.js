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
   state = {
      categories: [],
      currencies: []
   };
   async componentDidMount() {
      const {
         data: { categories, currencies }
      } = await getCategoriesAndCurrencies();
      this.setState(() => ({
         categories: categories.map(({ name }) => name) || [],
         currencies:
            currencies.map(({ symbol, label }) => ({ symbol, label })) || []
      }));
      const defaultCurrency = currencies[0].symbol || '';
      this.props.setCurrency(defaultCurrency);
   }
   render() {
      if (!this.state.categories.length > 0) return <></>;
      return (
         <div className="App">
            <div className="header">
               <Navbar {...this.state} />
            </div>
            <div className="main-body">
               <Outlet />
               <Routes>
                  <Route
                     index
                     element={
                        <Products firstCategory={this.state.categories[0]} />
                     }
                  />
                  {AllRoutes}
               </Routes>
            </div>
         </div>
      );
   }
}

App = connect(null, { setCurrency })(App);

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
