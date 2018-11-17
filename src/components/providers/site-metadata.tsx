import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

interface Site {
  site: {
    siteMetadata: SiteMetadata;
  };
}

interface SiteMetadata {
  siteTitle: string;
  siteUrl: string;
}

interface Props {
  render: RenderCallback<SiteMetadata>;
}

export const SiteMetadataProvider: React.SFC<Props> = ({ render }) => (
  <StaticQuery
    query={SiteMetadataQuery}
    render={({ site }: Site) => {
      const { siteMetadata } = site;
      const renderProps = siteMetadata;

      return render({ ...renderProps });
    }}
  />
);

const SiteMetadataQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        siteTitle: title
        siteUrl: url
      }
    }
  }
`;
