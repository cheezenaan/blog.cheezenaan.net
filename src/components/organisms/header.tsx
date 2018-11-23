import { Container, Navbar, NavbarBrand, NavbarItem, Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

interface Props {
  siteTitle: string;
  isRoot?: boolean;
}

// TODO: BlogPost のときだけ Navbar の classname に "has-shadow" を足したいので classNames を入れる
export const Header: React.SFC<Props> = ({ siteTitle, isRoot }) => (
  <header>
    <Navbar className="is-spaced has-shadow">
      <Container>
        <NavbarBrand>
          <NavbarItem>
            <Title
              className="header__title"
              tag={isRoot ? undefined : 'header'}
              isSize={4}
            >
              <Link to="/">{siteTitle}</Link>
            </Title>
          </NavbarItem>
        </NavbarBrand>
      </Container>
    </Navbar>
  </header>
);
