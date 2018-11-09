import * as React from 'react';
import Helmet from 'react-helmet';

import {
  ProviderProps,
  SiteMetadataProvider,
} from '../providers/site-metadata';

type Props = ProviderProps;

const Metatag: React.SFC<Props> = ({ siteTitle }) => (
  <Helmet
    title={siteTitle}
    meta={[
      { name: 'description', content: 'Sample' },
      { name: 'keywords', content: 'sample, something' },
    ]}
  />
);

export const WrappedMetatag = () => (
  <SiteMetadataProvider>
    {providerProps => <Metatag {...providerProps} />}
  </SiteMetadataProvider>
);
