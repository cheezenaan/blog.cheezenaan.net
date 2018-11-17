import { Container, Content, Heading, Section, Title } from 'bloomer';
import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../templates/layout';

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
    <Layout titleTag="header">
      <Helmet title={post.frontmatter.title} />
      <Section>
        <Container>
          <Heading>{post.frontmatter.date}</Heading>
          <Title>{post.frontmatter.title}</Title>
          <Content dangerouslySetInnerHTML={{ __html: post.html }} />
        </Container>
      </Section>
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
