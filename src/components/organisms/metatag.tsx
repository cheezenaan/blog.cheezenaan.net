import * as React from 'react';
import Helmet from 'react-helmet';

import { SiteMetadataProvider } from '../providers/site-metadata';

export const Metatag: React.SFC = () => (
  <SiteMetadataProvider
    render={providerProps => (
      <Helmet
        title={providerProps.siteTitle}
        meta={[{ name: 'description', content: 'Private blog' }]}
      >
        <html lang="ja" />
      </Helmet>
    )}
  />
);
