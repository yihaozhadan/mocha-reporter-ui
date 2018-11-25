import Head from 'next/head';
import {Container} from 'next/app';

const Layout = props => (
  <div>
    <Head>
      <title>
        {' '}
        {props.title}
        {' '}
      </title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"/>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"/>
    </Head>
    <Container>
      {props.children}
    </Container>
  </div>
);

export default Layout;
