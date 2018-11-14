import { Container, Navbar, NavbarBrand, NavbarItem, Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

import {
  ProviderProps,
  SiteMetadataProvider,
} from '../providers/site-metadata';

type Props = ProviderProps & {
  titleTag?: keyof React.ReactHTML;
};

// TODO: BlogPost のときだけ Navbar の classname に "has-shadow" を足したいので classNames を入れる
export const NavigationHeader: React.SFC<
  Omit<Props, keyof ProviderProps>
> = props => (
  <SiteMetadataProvider
    render={({ siteTitle }) => (
      <header>
        <Navbar className="is-spaced has-shadow">
          <Container>
            <NavbarBrand>
              <NavbarItem>
                <Title tag={props.titleTag} isSize={4}>
                  <Link to="/">{siteTitle}</Link>
                </Title>
              </NavbarItem>
            </NavbarBrand>
          </Container>
        </Navbar>
      </header>
    )}
  />
);
