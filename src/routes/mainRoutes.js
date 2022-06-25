import { Route } from 'react-router-dom';

//pagess
import Products from '../pages/ProductListing';
import ProductDescription from '../pages/ProductDescription';
import Cart from '../pages/Cart';

export default (
   <>
      <Route path={`/products/:category`} element={<Products />} />
      <Route path={'/product/:productId'} element={<ProductDescription />} />
      <Route path={'/cart'} element={<Cart />} />
   </>
);
