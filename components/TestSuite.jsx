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
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse, expand: this.state.collapse ? 'Expand' : 'Compress' });
  }

  render() {
    const testsuites = this.props.testSuites;
    let i = -1;
    return (
      <div>
        <Row>
          <Col>
            <b>Total   : </b>
            { this.props.totalTests }
          </Col>
          <Col className="text-success">
            <b>Success : </b>
            { this.props.successTests }
          </Col>
          <Col className="text-danger">
            <b>Failure : </b>
            { this.props.failedTests }
          </Col>
          <Col className="text-warning">
            <b>Skipped : </b>
            { this.props.skippedTests }
          </Col>
        </Row>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{ this.state.expand }</Button>
        <ListGroup>
          {
            testsuites.map((testSuite) => {
              if(!_.isEmpty(testSuite.testcase)) {
                i++;
                  return (
                  <TestCase name={testSuite.name} count={testSuite.testcase.length} testCases={testSuite.testcase} isOpen={this.state.collapse} key={i.toString()} />
                )
              }
            })
          }
        </ListGroup>
      </div>
    );
  }
}

export default TestSuite;
