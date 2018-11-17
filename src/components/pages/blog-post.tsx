import { Container, Content, Heading, Section, Title } from 'bloomer';
import { graphql } from 'gatsby';
import path from 'path';
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
  excerpt: string;
}

interface Props {
  data: {
    markdownRemark: Post;
    site: {
      siteMetadata: {
        siteTitle: string;
        siteUrl: string;
      };
    };
  };
}

// TODO: siteMetadata の情報を BlogPost から隔離する
export const BlogPost: React.SFC<Props> = ({ data }) => {
  const {
    markdownRemark: post,
    site: { siteMetadata },
  } = data;
  const { siteTitle, siteUrl } = siteMetadata;

  return (
    <Layout>
      <Helmet
        title={post.frontmatter.title}
        meta={[
          {
            property: 'og:title',
            content: `${post.frontmatter.title} - ${siteTitle}`,
          },
          {
            property: 'og:url',
            content: `${path.join(siteUrl, post.frontmatter.path)}`,
          },
          { property: 'description', content: post.excerpt },
        ]}
      />
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
      excerpt(pruneLength: 140, truncate: true)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
    site {
      siteMetadata {
        siteTitle: title
        siteUrl: url
      }
    }
  }
`;
