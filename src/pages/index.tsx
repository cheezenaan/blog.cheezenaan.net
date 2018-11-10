import 'bulma/css/bulma.css';

import {
  Box,
  Container,
  Content,
  Heading,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Section,
  Subtitle,
} from 'bloomer';
import { graphql, Link } from 'gatsby';
import * as React from 'react';

import { WrappedHeader as Header } from '../components/organisms/header';
import { WrappedMetatag as Metatag } from '../components/organisms/metatag';

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
    <>
      <Metatag />
      <Navbar className="is-spaced">
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
          {posts
            .filter(({ node: post }) => post.frontmatter.title.length > 0)
            .map(({ node: post }) => (
              <Box>
                <Heading>{post.frontmatter.date}</Heading>
                <Content key={post.id}>
                  <Subtitle>
                    <Link to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </Link>
                  </Subtitle>
                </Content>
                <Content>{post.excerpt}</Content>
              </Box>
            ))}
        </Container>
      </Section>
    </>
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
