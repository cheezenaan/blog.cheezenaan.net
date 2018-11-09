import { Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

import { InjectedProps, WithSiteMetadata } from '../providers/metadata';

type Props = InjectedProps & {
  tag?: keyof React.ReactHTML;
  isSize?: 1 | 2 | 3 | 4 | 5 | 6;
};

const Header: React.SFC<Props> = ({ siteTitle, ...titleProps }) => (
  <Title {...titleProps}>
    <Link to="/">{siteTitle}</Link>
  </Title>
);

export const WrappedHeader = (props: Omit<Props, keyof InjectedProps>) => (
  <WithSiteMetadata>
    {providerProps => <Header {...props} {...providerProps} />}
  </WithSiteMetadata>
);
