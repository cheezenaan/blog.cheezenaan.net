import { Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

import {
  ProviderProps,
  SiteMetadataProvider,
} from '../providers/site-metadata';

type Props = ProviderProps & {
  tag?: keyof React.ReactHTML;
};

// TODO: Header というより Navbar 的な名前が正しそうなのでいいかんじに抽出しなおす
export const WrappedHeader = (props: Omit<Props, keyof ProviderProps>) => (
  <SiteMetadataProvider>
    {providerProps => {
      const { ...titleProps } = props;

      return (
        <Title {...titleProps} isSize={4}>
          <Link to="/">{providerProps.siteTitle}</Link>
        </Title>
      );
    }}
  </SiteMetadataProvider>
);
