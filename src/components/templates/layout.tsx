import 'bulma/css/bulma.css';

import * as React from 'react';

import { WrappedMetatag as Metatag } from '../organisms/metatag';

// TODO: 現状だと Layout の役割があまりないので page ごとの意味をもたせた Layout にしたほうがいいかもしれない
export const Layout: React.SFC = ({ children }) => (
  <>
    <Metatag />
    {children}
  </>
);
