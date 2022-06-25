import { Route } from 'react-router-dom';

//pagess
import Products from '../pages/ProductListing';
// import ProductDetails from '../pages/ProductDetails';
// import Cart from '../pages/Cart';

export default (
   <>
      <Route path={`/products/:category`} element={<Products />} />
      {/* <Route path={'/product/:productId'} element={<ProductDetails />} />
      <Route path={'/cart'} element={<Cart />} /> */}
   </>
);
