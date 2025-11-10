import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://dev-wpheadless.pantheonsite.io/graphql";
// GraphQL client configured for server-side rendering
// Pages using this client should export 'dynamic = force-dynamic' for SSR
export const client = new GraphQLClient(endpoint);

export const GET_ALL_BLOGS = gql`
  query {
    blogs {
      nodes {
        date
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