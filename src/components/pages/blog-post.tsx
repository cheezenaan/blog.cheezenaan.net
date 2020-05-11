import { Container, Content, Heading, Section, Title } from 'bloomer';
import { graphql, Link } from 'gatsby';
import * as React from 'react';

import { Ogp } from '../organisms/ogp';
import { Layout } from '../templates/layout';

interface MarkdownRemark {
  frontmatter: Frontmatter;
}

interface Props {
  data: {
    markdownRemark: MarkdownRemark & {
      html: string;
      excerpt: string;
    };
  };
  pageContext: {
    prev?: MarkdownRemark;
    next?: MarkdownRemark;
  };
}

export const BlogPost: React.SFC<Props> = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;
  const { prev, next } = pageContext;

  return (
    <Layout>
      <Ogp
        title={post.frontmatter.title}
        path={post.frontmatter.path}
        description={post.excerpt}
      />
      <Section>
        <Container className="blog-post__container">
          <Heading>{post.frontmatter.date}</Heading>
          <Title>{post.frontmatter.title}</Title>
          <Content
            className="blog-post__content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </Section>
      <Section>
        <Container className="blog-navigation">
          {prev && (
            <div>
              prev:{' '}
              <Link to={prev.frontmatter.path}>{prev.frontmatter.title}</Link>
            </div>
          )}
          {next && (
            <div>
              next:{' '}
              <Link to={next.frontmatter.path}>{next.frontmatter.title}</Link>
            </div>
          )}
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
  }
`;
