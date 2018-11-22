/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/components/pages/blog-post.tsx`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            html
            frontmatter {
              date
              path
              title
            }
          }
          prev: previous {
            frontmatter {
              title
              path
            }
          }
          next {
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors);
  }

  return result.data.allMarkdownRemark.edges.forEach(({ node, prev, next }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        prev,
        next,
      },
    });
  });
};

exports.createPages = createPages;
