import './layout.sass';
import 'prismjs/themes/prism.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { siteMetadata } from '../../../gatsby-config';
import { Footer } from '../organisms/footer';
import { Header } from '../organisms/header';

// Use FontAwesome icons in React components
library.add(fab);

interface Props {
  children: React.ReactNode;
  isRoot?: boolean;
}

export const Layout: React.FC<Props> = ({ children, isRoot }) => (
  <>
    <Helmet
      defaultTitle={siteMetadata.title}
      titleTemplate={`%s - ${siteMetadata.title}`}
      meta={[{ name: 'description', content: 'something awesome' }]}
    >
      <html lang="ja" />
    </Helmet>
    <>
      <Header siteTitle={siteMetadata.title} isRoot={isRoot} />
      {children}
      <Footer />
    </>
  </>
);
