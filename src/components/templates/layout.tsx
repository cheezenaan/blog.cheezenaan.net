import './layout.sass';
import 'prismjs/themes/prism.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';

import { Footer } from '../organisms/footer';
import { Metatag } from '../organisms/metatag';

// Use FontAwesome icons in React components
library.add(fab);

export const Layout: React.SFC = ({ children }) => (
  <>
    <Metatag />
    {children}
    <Footer />
  </>
);
