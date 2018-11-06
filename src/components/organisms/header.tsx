import { Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

import { InjectedProps, withSiteMetadata } from '../helper';

type HeaderProps = {
  tag?: keyof React.ReactHTML;
  isSize?: 1 | 2 | 3 | 4 | 5 | 6;
};

type Props = HeaderProps & InjectedProps;

export const Header: React.SFC<Props> = ({ tag, isSize, siteTitle }) => (
  <Title tag={tag} isSize={isSize}>
    <Link to="/">{siteTitle}</Link>
  </Title>
);

export const WrappedHeader: React.SFC<HeaderProps> = ({ tag, isSize }) =>
  withSiteMetadata({ tag, isSize })(Header);
