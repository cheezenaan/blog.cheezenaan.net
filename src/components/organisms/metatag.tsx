import * as React from 'react';
import Helmet from 'react-helmet';

import { InjectedProps, WithSiteMetadata } from '../helper';

type Props = InjectedProps;

const Metatag: React.SFC<Props> = ({ siteTitle }) => (
  <Helmet
    title={siteTitle}
    meta={[
      { name: 'description', content: 'Sample' },
      { name: 'keywords', content: 'sample, something' },
    ]}
  />
);

export const WrappedMetatag = () => (
  <WithSiteMetadata>
    {providerProps => <Metatag {...providerProps} />}
  </WithSiteMetadata>
);
