import { Section } from 'bloomer';
import * as React from 'react';

import { WrappedMetaTag as MetaTag } from '../organisms/metatag';

export const Layout: React.SFC = ({ children }) => (
  <>
    <MetaTag />
    <Section>
      <>{children}</>
    </Section>
  </>
);
