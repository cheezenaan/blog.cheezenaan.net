import { graphql, Link } from 'gatsby';
import * as React from 'react';

import { Layout } from '../components/layout';

interface Post {
  node: {
    excerpt: string;
    id: number;
    frontmatter: {
      title: string;
      date: string;
      path: string;
    };
  };
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Post[];
    };
  };
}

const IndexPage: React.SFC<Props> = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <div className="blog-posts">
        {posts
          .filter(({ node: post }) => post.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <div className="blog-post-preview" key={post.id}>
              <h1>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h1>
              <h2>{post.frontmatter.date}</h2>
              <p>{post.excerpt}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 280)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
