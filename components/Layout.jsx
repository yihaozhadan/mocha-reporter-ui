import Head from 'next/head';
import { Container } from 'reactstrap';
import { Provider } from "react-redux";
import store from '../store';

const Layout = props => (
  <div>
    <Head>
      <title>
        {' '}
        {props.title}
        {' '}
      </title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" />
    </Head>
    <Provider store={store}>
      <Container>
        {props.children}
      </Container>
    </Provider>
  </div>
);

export default Layout;
