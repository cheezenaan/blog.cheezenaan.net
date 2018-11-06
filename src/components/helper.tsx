import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

export interface InjectedProps {
  siteTitle: string;
}

interface Props {
  children: (props: InjectedProps) => React.ReactNode;
}

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

export const WithSiteMetadata = ({ children }: Props) => (
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
