declare type RenderCallback<T> = (data: T) => React.ReactNode;

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

interface Frontmatter {
  title: string;
  path: string;
  date?: string;
}
