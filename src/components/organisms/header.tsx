import { Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

import {
  ProviderProps,
  SiteMetadataProvider,
} from '../providers/site-metadata';

type Props = ProviderProps & {
  tag?: keyof React.ReactHTML;
  isSize?: 1 | 2 | 3 | 4 | 5 | 6;
};

const Header: React.SFC<Props> = ({ siteTitle, ...titleProps }) => (
  <Title {...titleProps}>
    <Link to="/">{siteTitle}</Link>
  </Title>
);

export const WrappedHeader = (props: Omit<Props, keyof ProviderProps>) => (
  <SiteMetadataProvider>
    {providerProps => <Header {...props} {...providerProps} />}
  </SiteMetadataProvider>
);
