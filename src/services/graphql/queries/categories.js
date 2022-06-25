import { gql } from '@apollo/client';

const getCategoriesQuery = gql`
   query {
      categories {
         name
      }
      currencies {
         symbol
         label
      }
   }
`;
export default getCategoriesQuery;
