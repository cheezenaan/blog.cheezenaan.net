import { Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

import { InjectedProps, WithSiteMetadata } from '../helper';

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

export const WrappedHeader = (props: HeaderProps) => (
  <WithSiteMetadata>
    {providerProps => <Header {...props} {...providerProps} />}
  </WithSiteMetadata>
);
