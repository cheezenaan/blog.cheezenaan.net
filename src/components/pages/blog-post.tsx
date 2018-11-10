import './blog-post.css';

import {
  Container,
  Content,
  Heading,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Section,
  Title,
} from 'bloomer';
import { graphql } from 'gatsby';
import * as React from 'react';

import { WrappedHeader as Header } from '../organisms/header';
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
    <Layout>
      <Navbar className="is-spaced has-shadow">
        <Container>
          <NavbarBrand>
            <NavbarItem>
              <Header tag="header" />
            </NavbarItem>
          </NavbarBrand>
        </Container>
      </Navbar>
      <Section>
        <Container>
          <Heading>{post.frontmatter.date}</Heading>
          <Content>
            <Title>{post.frontmatter.title}</Title>
          </Content>
        </Container>
        <Container>
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
