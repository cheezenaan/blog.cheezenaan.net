import './blog-post.css';

import { Container, Content, Title } from 'bloomer';
import { graphql } from 'gatsby';
import * as React from 'react';

import { Layout } from '../templates/layout';
import { WrappedHeader as Header } from '../organisms/header';

interface Post {
  frontmatter: {
    date: string;
    path: string;
    title: string;
  };
  html: string;
}

interface Props {
  data: {
    markdownRemark: Post;
  };
}

export const BlogPost: React.SFC<Props> = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <Header tag="span" />
      <Container>
        <Title tag="h1">{post.frontmatter.title}</Title>
        <Content dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </Layout>
  );
};
export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
