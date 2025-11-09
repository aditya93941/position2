import { GraphQLClient, gql } from "graphql-request";
import { unstable_cache } from "next/cache";

const endpoint = "https://dev-wpheadless.pantheonsite.io/graphql";
export const client = new GraphQLClient(endpoint);

export const GET_ALL_BLOGS = gql`
  query {
    blogs {
      nodes {
        title
        slug
        date
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

/**
 * Cached GraphQL request wrapper using Next.js 16 unstable_cache
 * This provides proper Next.js data caching for GraphQL requests
 * 
 * @param query - GraphQL query string
 * @param variables - GraphQL variables
 * @param revalidate - Revalidation time in seconds (default: 60)
 * @param tags - Cache tags for on-demand revalidation
 */
export async function cachedRequest<T>(
  query: string,
  variables?: Record<string, any>,
  revalidate: number = 60,
  tags?: string[]
): Promise<T> {
  const cacheKey = `graphql-${query}-${JSON.stringify(variables || {})}`;
  
  return unstable_cache(
    async () => {
      return client.request<T>(query, variables);
    },
    [cacheKey],
    {
      revalidate,
      tags: tags || ['graphql'],
    }
  )();
}

/**
 * Get all blogs with caching
 */
export async function getAllBlogs() {
  return cachedRequest(
    GET_ALL_BLOGS,
    undefined,
    60, // Revalidate every 60 seconds
    ['blogs', 'all-blogs']
  );
}

/**
 * Get blog by slug with caching
 */
export async function getBlogBySlug(slug: string): Promise<{ blog: any }> {
  const query = gql`
    query GetBlogBySlug($slug: ID!) {
      blog(id: $slug, idType: SLUG) {
        date
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;
  
  return cachedRequest<{ blog: any }>(
    query,
    { slug },
    60, // Revalidate every 60 seconds
    ['blogs', `blog-${slug}`]
  );
}