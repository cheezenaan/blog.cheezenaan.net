import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

interface Props {
  render: RenderCallback<ProviderProps>;
}

interface ProviderProps {
  siteTitle: string;
}

export const SiteMetadataProvider: React.SFC<Props> = ({ render }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data: SiteMetadata) => {
      const { siteMetadata } = data.site;
      const renderProps = { siteTitle: siteMetadata.title };

      return render({ ...renderProps });
    }}
  />
);
