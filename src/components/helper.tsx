import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

/**
 * type Original = Omit<{ foo: string, bar: number }, { bar: number }> // = { foo: string; }
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
