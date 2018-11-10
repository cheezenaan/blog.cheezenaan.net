import {
  Container,
  Content,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Section,
  Title,
} from 'bloomer';
import * as React from 'react';

import { WrappedHeader as Header } from '../components/organisms/header';
import { WrappedMetatag as Metatag } from '../components/organisms/metatag';

const NotFoundPage = () => (
  <>
    <Metatag />
    <Navbar className="is-spaced">
      <Container>
        <NavbarBrand>
          <NavbarItem>
            <Header tag="header" />
          </NavbarItem>
        </NavbarBrand>
      </Container>
    </Navbar>
    <Section>
      <Container>
        <Title tag="h2">NOT FOUND</Title>
        <Content>
          You just hit a route that doesn&#39;t exist... the sadness.
        </Content>
      </Container>
    </Section>
  </>
);

export default NotFoundPage;
