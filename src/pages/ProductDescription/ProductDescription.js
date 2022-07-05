import { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import parseHtmlString from 'html-react-parser';

import './ProductDescription.css';
import { withRouter } from '../../services/helpers/withRouter';
import { getProductDescription } from '../../services/graphql/requests';

//components
import Attributes from '../../components/ProductAttributes';
import Button from '../../components/Button';

//services
import { addProductToCart } from '../../services/redux/cartSlice';
import { getAmount } from '../../services/helpers/generalHelper';

class ProductDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         brand: '',
         name: '',
         attributes: [],
         selectedAttributes: [],
         price: {
            amount: '',
            currency: { symbol: '' }
         },
         gallery: [],
         description: '',
         prices: [],
         inStock: false
      };
   }

   async componentDidMount() {
      await this.fetchProductDetails();
   }

   fetchProductDetails = async () => {
      const {
         data: { product }
      } = await getProductDescription(this.props.params.productId);
      const { name, attributes, brand, gallery, description, prices, inStock } =
         product;

      const price = getAmount(prices, this.props.currency);

      const selectedAttributes = attributes.map(({ id, name, items }) => {
         return {
            id,
            name,
            selectedAttribute: items[0]?.id
         };
      });

      this.setState(() => ({
         brand,
         name,
         attributes,
         selectedAttributes,
         price,
         gallery,
         selectedImage: gallery[0],
         description,
         prices,
         inStock
      }));
   };

   selectAttribute = (attributeId, selectedAttribute) => {
      const selectedAttributes = [...this.state.selectedAttributes];

      const attrIndex = selectedAttributes.findIndex(
         (attr) => attr.id === attributeId
      );

      selectedAttributes[attrIndex].selectedAttribute = selectedAttribute;

      this.setState(() => ({
         selectedAttributes
      }));
   };

   addProductToCartHandler = () => {
      const {
         brand,
         name,
         attributes,
         selectedAttributes,
         gallery,
         description,
         prices
      } = this.state;
      this.props.addProductToCart({
         brand,
         name,
         attributes,
         selectedAttributes,
         gallery,
         description,
         prices
      });
   };

   selectImage = (imageIndex) => {
      this.setState((state) => ({
         selectedImage: state.gallery[imageIndex]
      }));
   };

   render() {
      const {
         brand,
         name,
         attributes,
         selectedAttributes,
         gallery,
         selectedImage,
         description,
         prices,
         inStock
      } = this.state;
      const { currency } = this.props;
      const amount = !isEmpty(prices) ? getAmount(prices, currency) : 0;
      return (
         <div className="product-description-page">
            <div className="side-gallery">
               {gallery.map((image, index) => (
                  <div
                     key={index}
                     className="side-image cursor-pointer hover-effect"
                     onClick={() => this.selectImage(index)}
                  >
                     <img src={image} alt={image}></img>
                     <div className="img-overlay"></div>
                  </div>
               ))}
            </div>
            <div className="selected-image">
               <img src={selectedImage} alt="selected-product"></img>
               {!inStock && (
                  <h4 className="out-of-stock center-xy">OUT OF STOCK</h4>
               )}
               <div className="img-overlay"></div>
            </div>
            <div className="product-details">
               <h2 className="p-brand ff-raleway">{brand}</h2>
               <h2 className="p-name ff-raleway">{name}</h2>

               {attributes.map((attribute, index) => {
                  let selectedAttribute = selectedAttributes.find(
                     (attr) => attribute.id === attr.id
                  )?.selectedAttribute;
                  return (
                     <Attributes
                        key={`${selectedAttribute}-${index}`}
                        attributes={attribute}
                        selectedAttribute={selectedAttribute}
                        selectAttribute={(type, attributeId) =>
                           this.selectAttribute(type, attributeId)
                        }
                     />
                  );
               })}
               <h3 className="price-title">PRICE:</h3>
               <h3 className="price-value ff-raleway">
                  {currency}
                  {amount}
               </h3>
               <Button
                  onClick={() => this.addProductToCartHandler()}
                  name={'ADD TO CART'}
                  disabled={!inStock}
               />
               <div className="product-description ff-roboto">
                  {parseHtmlString(description)}
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = ({ currency }) => ({
   currency
});
const mapDispatchToProps = { addProductToCart };

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withRouter(ProductDetails));
