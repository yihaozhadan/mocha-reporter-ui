import axios from 'axios';
import React from 'react';
import Layout from '../components/Layout';
import TestSuite from '../components/TestSuite';
import {connect} from 'react-redux';
import {loadTestSuites} from '../actions/testCaseActions';

const port = parseInt(process.env.PORT, 10) || 3003;

class Index extends React.Component {
  static async getInitialProps({reduxStore}) {
    let res = {};
    try {
      res = await axios.get(`http://localhost:${port}/test`);
      reduxStore.dispatch(loadTestSuites(res.data.testsuites));
    } catch (error) {
      console.log(error);
    }
    return reduxStore.getState();
  }

  render() {
    return (
      <Layout title={this.props.name}>
        <TestSuite testSuites={this.props.testSuite}/>
      </Layout>
    )
  }
}

export default connect()(Index)