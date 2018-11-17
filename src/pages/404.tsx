import { Container, Content, Section, Subtitle } from 'bloomer';
import * as React from 'react';

import { Layout } from '../components/templates/layout';

const NotFoundPage: React.SFC = () => (
  <Layout>
    <Section>
      <Container>
        <Subtitle tag="h2">NOT FOUND</Subtitle>
        <Content>
          You just hit a route that doesn&#39;t exist... the sadness.
        </Content>
      </Container>
    </Section>
  </Layout>
);
export default NotFoundPage;
