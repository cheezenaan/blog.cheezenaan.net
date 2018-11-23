import { Box, Container, Content, Heading, Section, Subtitle } from 'bloomer';
import { graphql, Link } from 'gatsby';
import * as React from 'react';

import { Ogp } from '../components/organisms/ogp';
import { Layout } from '../components/templates/layout';

interface MarkdownRemark {
  frontmatter: Frontmatter;
  excerpt: string;
  id: number;
}

interface MarkdownRemarkEdge {
  post: MarkdownRemark;
}

interface Props {
  data: {
    allMarkdownRemark: {
      posts: MarkdownRemarkEdge[];
    };
  };
}

const IndexPage: React.SFC<Props> = ({ data }) => {
  const { posts } = data.allMarkdownRemark;
  const filteredPosts = posts.filter(
    ({ post }) => post.frontmatter.title.length > 0
  );

  return (
    <Layout isRoot>
      <Ogp isRoot />
      <Section>
        <Container>
          {filteredPosts.map(({ post }) => (
            <Box key={post.id}>
              <Heading>{post.frontmatter.date}</Heading>
              <Subtitle>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </Subtitle>
              <Content>{post.excerpt}</Content>
            </Box>
          ))}
        </Container>
      </Section>
    </Layout>
  );
};
export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      posts: edges {
        post: node {
          excerpt(pruneLength: 200, truncate: true)
          id
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
