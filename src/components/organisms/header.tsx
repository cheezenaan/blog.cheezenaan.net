import { Title } from 'bloomer';
import { Link } from 'gatsby';
import * as React from 'react';

interface Props {
  siteTitle: string;
}

export const Header: React.SFC<Props> = ({ siteTitle }) => (
  <Title>
    <Link to="/">{siteTitle}</Link>
  </Title>
);
