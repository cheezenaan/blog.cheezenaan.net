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
  children: RenderCallback<ProviderProps>;
}

export interface ProviderProps {
  siteTitle: string;
}

export const SiteMetadataProvider: React.SFC<Props> = ({ children }) => (
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

      return children && children({ ...renderProps });
    }}
  />
);
