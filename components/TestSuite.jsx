import React from 'react';
import {
  Button, ListGroup, Row, Col,
} from 'reactstrap';
import TestCase from './TestCase';

class TestSuite extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, expand: 'Expand' };
    let count = 0;
    this.props.testSuites.forEach((testSuite) => {
      count += parseInt(testSuite.tests);
    });
    this.totalTests = count;
    count = 0;
    this.props.testSuites.forEach((testSuite) => {
      count += parseInt(testSuite.failures);
    });
    this.failedTests = count;
    count = 0;
    this.props.testSuites.forEach((testSuite) => {
      count += parseInt(testSuite.skipped);
    });
    this.skippedTests = count;
    this.successTests = this.totalTests - this.failedTests - this.skippedTests;
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse, expand: this.state.collapse ? 'Expand' : 'Compress' });
  }

  render() {
    const testsuites = this.props.testSuites;
    return (
      <div>
        <Row>
          <Col>
            <b>Total   : </b>
            { this.totalTests }
          </Col>
          <Col className="text-success">
            <b>Success : </b>
            { this.successTests }
          </Col>
          <Col className="text-danger">
            <b>Failure : </b>
            { this.failedTests }
          </Col>
          <Col className="text-warning">
            <b>Skipped : </b>
            { this.skippedTests }
          </Col>
        </Row>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{ this.state.expand }</Button>
        <ListGroup>
          {
            testsuites.map((testSuite, i) => (
              <TestCase name={testSuite.name} count={testSuite.tests} testCases={testSuite.testcase} isOpen={this.state.collapse} key={i.toString()} />
            ))
          }
        </ListGroup>
      </div>
    );
  }
}

export default TestSuite;
