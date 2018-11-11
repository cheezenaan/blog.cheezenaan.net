import './layout.sass';
import 'prismjs/themes/prism.css';

import * as React from 'react';

import { Footer } from '../organisms/footer';
import { WrappedMetatag as Metatag } from '../organisms/metatag';

export const Layout: React.SFC = ({ children }) => (
  <>
    <Metatag />
    {children}
    <Footer />
  </>
);
