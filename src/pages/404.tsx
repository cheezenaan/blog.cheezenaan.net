import { Title } from 'bloomer';
import * as React from 'react';

import { Layout } from '../components/templates/layout';

const NotFoundPage = () => (
  <Layout>
    <Title tag="h2">NOT FOUND</Title>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
