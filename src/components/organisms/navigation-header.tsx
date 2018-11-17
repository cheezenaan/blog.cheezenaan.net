import { Container, Navbar, NavbarBrand, NavbarItem, Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

interface Props {
  siteTitle: string;
  titleTag?: keyof React.ReactHTML;
}

// TODO: BlogPost のときだけ Navbar の classname に "has-shadow" を足したいので classNames を入れる
export const NavigationHeader: React.SFC<Props> = ({ siteTitle, titleTag }) => (
  <header>
    <Navbar className="is-spaced has-shadow">
      <Container>
        <NavbarBrand>
          <NavbarItem>
            <Title tag={titleTag} isSize={4}>
              <Link to="/">{siteTitle}</Link>
            </Title>
          </NavbarItem>
        </NavbarBrand>
      </Container>
    </Navbar>
  </header>
);
