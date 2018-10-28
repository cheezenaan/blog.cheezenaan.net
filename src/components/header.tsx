import { Link } from 'gatsby';
import * as React from 'react';

interface Props {
  siteTitle: string;
}

export const Header: React.SFC<Props> = ({ siteTitle }) => (
  <div>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
  </div>
);
