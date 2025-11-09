import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://dev-wpheadless.pantheonsite.io/graphql";
export const client = new GraphQLClient(endpoint);

export const GET_ALL_BLOGS = gql`
  query {
    blogs {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;