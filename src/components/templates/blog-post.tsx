import './blog-post.sass';

import { Container, Content, Heading, Section, Title } from 'bloomer';
import { graphql } from 'gatsby';
import * as React from 'react';

import { WrappedMetatag as Metatag } from '../organisms/metatag';
import { NavigationHeader } from '../organisms/navigation-header';

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
    <>
      <Metatag />
      <NavigationHeader titleTag="header" />
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
    </>
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
