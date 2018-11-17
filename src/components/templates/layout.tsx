import './layout.sass';
import 'prismjs/themes/prism.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Footer } from '../organisms/footer';
import { NavigationHeader } from '../organisms/navigation-header';
import { SiteMetadataProvider } from '../providers/site-metadata';

// Use FontAwesome icons in React components
library.add(fab);

interface Props {
  children: React.ReactNode;
  isRoot?: boolean;
}

export const Layout: React.SFC<Props> = ({ children, isRoot }) => (
  <SiteMetadataProvider
    render={({ siteTitle }) => (
      <>
        <Helmet
          defaultTitle={siteTitle}
          titleTemplate={`%s - ${siteTitle}`}
          meta={[{ name: 'description', content: 'Private blog' }]}
        >
          <html lang="ja" />
        </Helmet>
        <NavigationHeader siteTitle={siteTitle} isRoot={isRoot} />
        {children}
        <Footer />
      </>
    )}
  />
);
