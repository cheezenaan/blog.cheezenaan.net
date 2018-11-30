import * as React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../../gatsby-config';

const defaultProps = {
  isRoot: false,
  title: '',
  path: '',
  description: '',
};

type Props = Partial<typeof defaultProps>;

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
          property: 'og:image',
          content:
            'https://www.gravatar.com/avatar/544edf5a0f3541a800f0b2911a3176df.jpg?size=400',
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
