import * as React from 'react';
import Helmet from 'react-helmet';

interface Props {
  siteTitle: string;
  pageTitle?: string;
}

export const Metatag: React.SFC<Props> = ({ siteTitle, pageTitle }) => (
  <Helmet
    title={pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle}
    meta={[{ name: 'description', content: 'Private blog' }]}
  >
    <html lang="ja" />
  </Helmet>
);
