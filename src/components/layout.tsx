import 'ress/ress.css';

import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

import { Header } from './header';

export const Layout: React.SFC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>{children}</div>
      </>
    )}
  />
);
