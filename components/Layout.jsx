import Head from 'next/head';
import { Container } from 'reactstrap';
import Header from './Header';
import { ScrollButton } from './';

const Layout = (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
    </Head>
    <Container>
      <Header title={props.title} />
      {props.children}
      <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
    </Container>
  </div>
);

export default Layout;
