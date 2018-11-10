import { Container, Content, Section, Subtitle } from 'bloomer';
import * as React from 'react';

import { WrappedMetatag as Metatag } from '../components/organisms/metatag';
import { NavigationHeader } from '../components/organisms/navigation-header';

const NotFoundPage = () => (
  <>
    <Metatag />
    <NavigationHeader />
    <Section>
      <Container>
        <Subtitle tag="h2">NOT FOUND</Subtitle>
        <Content>
          You just hit a route that doesn&#39;t exist... the sadness.
        </Content>
      </Container>
    </Section>
  </>
);

export default NotFoundPage;
