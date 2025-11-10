import { GraphQLClient, gql } from "graphql-request";
import { cacheTag, cacheLife } from "next/cache";

const endpoint = "https://dev-wpheadless.pantheonsite.io/graphql";
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

// Cached function to fetch all blogs using Cache Components
export async function getAllBlogs() {
  'use cache';
  cacheTag('blogs');
  // Use custom cache profile: 10-second revalidation
  // Cache will be considered stale after 10s, revalidated on next request
  cacheLife('10-seconds');
  
  const data = await client.request(GET_ALL_BLOGS);
  return data;
}

// Cached function to fetch blog by slug
export async function getBlogBySlug(slug: string) {
  'use cache';
  cacheTag(`blog-${slug}`);
  // Use same cache profile for consistency
  cacheLife('10-seconds');
  
  const data = await client.request(
    `
    query GetBlogBySlug($slug: ID!) {
      blog(id: $slug, idType: SLUG) {
        date
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `,
    { slug }
  );
  
  return data;
}