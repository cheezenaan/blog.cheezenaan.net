declare module '*/gatsby-config' {
  interface GatsbyConfig {
    siteMetadata: {
      title: string;
      url: string;
    };
  }
  const value: GatsbyConfig;
  export = value;
}

type RenderCallback<T> = (data: T) => React.ReactNode;

interface Frontmatter {
  title: string;
  path: string;
  date?: string;
}
