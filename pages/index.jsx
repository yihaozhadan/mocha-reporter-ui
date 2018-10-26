import axios from 'axios';
import React from 'react';
import Layout from '../components/Layout';
import TestSuite from '../components/TestSuite';

const Index = props => (
  <Layout title={props.report.testsuites.name}>
    <div>
      <h1>{props.report.testsuites.name}</h1>
      <TestSuite testSuites={props.report.testsuites.testsuite} />
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  let res = {};
  try {
    res = await axios.get('http://localhost:3003/test');
  } catch (error) {
    console.log(error);
  } return {
    report:
      res.data,
  };
};

export default Index;
