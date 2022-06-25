import { gql } from '@apollo/client';

const getProductDescription = gql`
   query Product($productId: String!) {
      product(id: $productId) {
         id
         name
         gallery
         description
         attributes {
            id
            name
            type
            items {
               displayValue
               value
               id
            }
         }
         prices {
            currency {
               label
               symbol
            }
            amount
         }
         brand
      }
   }
`;
export default getProductDescription;
