import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

export interface InjectedProps {
  siteTitle: string;
}

interface OptionsProps {
  [key: string]: any;
}

export const withSiteMetadata = (options: OptionsProps = {}) => <
  OriginalProps extends object
>(
  Component: React.ComponentType<OriginalProps & InjectedProps>
) => (
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
    render={(data: any) => {
      const { siteMetadata } = data.site;
      const renderProps = { ...options, siteTitle: siteMetadata.title };

      return <Component {...renderProps} />;
    }}
  />
);
