import { gql } from '@apollo/client';

const getProductsQuery = gql`
   query Category($categoryType: String!) {
      category(input: { title: $categoryType }) {
         name
         products {
            id
            name
            inStock
            gallery
            prices {
               currency {
                  label
                  symbol
               }
               amount
            }
         }
      }
   }
`;
export default getProductsQuery;
