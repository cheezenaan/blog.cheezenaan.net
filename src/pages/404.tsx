import { Container, Content, Section, Title } from 'bloomer';
import * as React from 'react';

import { Ogp } from '../components/organisms/ogp';
import { Layout } from '../components/templates/layout';

const NotFoundPage: React.FC = () => (
  <Layout>
    <Ogp />
    <Section>
      <Container>
        <Title>NOT FOUND</Title>
        <Content>
          You just hit a route that doesn&#39;t exist... the sadness.
        </Content>
      </Container>
    </Section>
  </Layout>
);
export default NotFoundPage;
