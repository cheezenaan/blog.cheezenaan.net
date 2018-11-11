import './layout.sass';
import 'prismjs/themes/prism.css';

import * as React from 'react';

import { Footer } from '../organisms/footer';
import { Metatag } from '../organisms/metatag';

export const Layout: React.SFC = ({ children }) => (
  <>
    <Metatag />
    {children}
    <Footer />
  </>
);
