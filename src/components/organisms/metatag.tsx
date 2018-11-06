import * as React from 'react';
import Helmet from 'react-helmet';

import { InjectedProps, WithSiteMetadata } from '../helper';

type MetatagProps = {};
type Props = MetatagProps & InjectedProps;

const Metatag: React.SFC<Props> = ({ siteTitle }) => (
  <Helmet
    title={siteTitle}
    meta={[
      { name: 'description', content: 'Sample' },
      { name: 'keywords', content: 'sample, something' },
    ]}
  />
);

export const WrappedMetatag: React.SFC<MetatagProps> = (
  props: MetatagProps
) => (
  <WithSiteMetadata>
    {providerProps => <Metatag {...props} {...providerProps} />}
  </WithSiteMetadata>
);
