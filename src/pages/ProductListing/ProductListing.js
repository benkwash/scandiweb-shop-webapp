import { Component } from 'react';
import { connect } from 'react-redux';

import { getCategoryProducts } from '../../services/graphql/requests';

import './ProductListing.css';

//helpers
import { withRouter } from '../../services/helpers/withRouter';
import { getAmount } from '../../services/helpers/generalHelper';

//components
import ProductCard from '../../components/ProductCard';

export class Products extends Component {
   constructor(props) {
      super(props);
      const { params, firstCategory } = props;
      this.state = {
         selectedCategory: params.category || firstCategory,
         products: []
      };
   }

   async componentDidMount() {
      const selectedCategory = this.state.selectedCategory;
      if (selectedCategory) await this.fetchAndSetProducts(selectedCategory);
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.params.category !== this.props.params.category)
         this.fetchAndSetProducts(this.props.params.category);
   }

   fetchAndSetProducts = async (selectedCategory) => {
      const results = await getCategoryProducts(selectedCategory).catch(
         (error) => console.log({ error }) //errors should be caught but lets catch here in case
      );
      const {
         data: {
            category: { products }
         }
      } = results;

      this.setState((state) => ({
         ...state,
         products,
         selectedCategory
      }));
   };

   navigateToProductDetails = (productID) => {
      this.props.navigate(`/product/${productID}`);
   };

   render() {
      const { selectedCategory, products } = this.state;
      const { currency } = this.props;

      const productCards = products.map(
         ({ name, gallery, prices, id, inStock, brand }, index) => (
            <div key={`${index}-${id}-${currency}`}>
               <ProductCard
                  image={gallery[0]}
                  name={name}
                  currency={currency}
                  price={getAmount(prices, currency)}
                  inStock={inStock}
                  goToProduct={() => this.navigateToProductDetails(id)}
                  brand={brand}
               />
            </div>
         )
      );
      return (
         <div className="products-page">
            <h2>
               {selectedCategory[0].toUpperCase() +
                  selectedCategory.slice(1).toLowerCase()}
            </h2>
            <div className="products-container">{productCards}</div>
         </div>
      );
   }
}

const mapStateToProps = ({ currency }) => ({
   currency
});

export default connect(mapStateToProps)(withRouter(Products));
