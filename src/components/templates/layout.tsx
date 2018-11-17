import './layout.sass';
import 'prismjs/themes/prism.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';

import { Footer } from '../organisms/footer';
import { Metatag } from '../organisms/metatag';

// Use FontAwesome icons in React components
library.add(fab);

interface Props {
  pageTitle?: string;
  children: React.ReactNode;
}
export const Layout: React.SFC<Props> = ({ pageTitle, children }) => (
  <>
    <Metatag pageTitle={pageTitle} />
    {children}
    <Footer />
  </>
);
