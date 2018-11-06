import { Section } from 'bloomer';
import * as React from 'react';

import { WrappedMetatag as Metatag } from '../organisms/metatag';

export const Layout: React.SFC = ({ children }) => (
  <>
    <Metatag />
    <Section>
      <>{children}</>
    </Section>
  </>
);
