import * as React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../../gatsby-config';

const DefaultProps = {
  isRoot: false,
  title: '',
  path: '',
  description: '',
};

type Props = Partial<typeof DefaultProps>;

export const Ogp: React.SFC<Props> = ({ isRoot, title, path, description }) => {
  const { title: siteTitle, url: siteUrl } = siteMetadata;

  return (
    <Helmet
      title={title}
      meta={[
        {
          property: 'description',
          content: description || 'something awesome',
        },
        {
          property: 'og:title',
          content: title ? `${title} - ${siteTitle}` : siteTitle,
        },
        { property: 'og:type', content: isRoot ? 'website' : 'article' },
        {
          property: 'og:url',
          content: `${path ? `${siteUrl.concat(path)}` : siteUrl}`,
        },
        {
          property: 'og:description',
          content: description || 'something awesome',
        },
        { property: 'twitter:card', content: 'summary' },
        { property: 'twitter:site', content: '@cheezenaan' },
      ]}
    />
  );
};
