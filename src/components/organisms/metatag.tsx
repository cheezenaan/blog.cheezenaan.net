import * as React from 'react';
import Helmet from 'react-helmet';

import { SiteMetadataProvider } from '../providers/site-metadata';

interface Props {
  pageTitle?: string;
}

export const Metatag: React.SFC<Props> = ({ pageTitle }) => (
  <SiteMetadataProvider
    render={providerProps => (
      <Helmet
        title={
          pageTitle
            ? `${pageTitle} - ${providerProps.siteTitle}`
            : providerProps.siteTitle
        }
        meta={[{ name: 'description', content: 'Private blog' }]}
      >
        <html lang="ja" />
      </Helmet>
    )}
  />
);
