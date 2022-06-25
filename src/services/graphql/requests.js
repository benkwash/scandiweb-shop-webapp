import client from './apolloSetup';
import handleAsyncFunction from '../helpers/handleAsyncErrors';

//queries
import categoriesAndCurrencies from './queries/categories';
import products from './queries/products';
import productDescription from './queries/productDescription';

const makeGraphqlRequest = (query, variables) =>
   handleAsyncFunction(client.query, { query, variables: variables });

const getCategoriesAndCurrencies = () =>
   makeGraphqlRequest(categoriesAndCurrencies);

const getCategoryProducts = (categoryType) =>
   makeGraphqlRequest(products, { categoryType });

const getProductDescription = (productId) =>
   makeGraphqlRequest(productDescription, { productId });

export {
   makeGraphqlRequest,
   getCategoriesAndCurrencies,
   getCategoryProducts,
   getProductDescription
};
