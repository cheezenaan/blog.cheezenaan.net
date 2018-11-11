import * as React from 'react';
import Helmet from 'react-helmet';

import { SiteMetadataProvider } from '../providers/site-metadata';

export const Metatag = () => (
  <SiteMetadataProvider>
    {providerProps => (
      <Helmet
        title={providerProps.siteTitle}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
    )}
  </SiteMetadataProvider>
);
