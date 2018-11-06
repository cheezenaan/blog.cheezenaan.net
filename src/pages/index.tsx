import { Container, Content, Title } from 'bloomer';
import { graphql, Link } from 'gatsby';
import * as React from 'react';

import { Layout } from '../components/templates/layout';

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
      <Container>
        {posts
          .filter(({ node: post }) => post.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <Content className="blog-post-preview" key={post.id}>
              <Title tag="h2" isMarginless>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </Title>
              <p>{post.frontmatter.date}</p>
              <p>{post.excerpt}</p>
            </Content>
          ))}
      </Container>
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
