// import { useQuery, gql } from '@apollo/client';
import client from './apolloSetup';
import handleAsyncFunction from '../helpers/handleAsyncErrors';

//queries
import categoriesAndCurrencies from './queries/categories';
import products from './queries/products';

const makeGraphqlRequest = (query, variables) =>
   handleAsyncFunction(client.query, { query, variables: variables });

const getCategoriesAndCurrencies = () =>
   makeGraphqlRequest(categoriesAndCurrencies);

const getCategoryProducts = (categoryType) =>
   makeGraphqlRequest(products, { categoryType });

export { makeGraphqlRequest, getCategoriesAndCurrencies, getCategoryProducts };
