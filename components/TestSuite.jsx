import { useState } from 'react';
import { Button, ListGroup, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import TestCase from './TestCase';

const TestSuite = () => {
  const testSuitesState = useSelector((state) => state.testSuites);
  const [collapse, setCollapse] = useState(false);
  const testSuites = testSuitesState.testSuite;
  let i = -1;
  return (
    <div>
      <Row>
        <Col>
          <b>Total : </b>
          {testSuites?.length || 0}
        </Col>
        <Col className="text-success">
          <b>Success : </b>
          {testSuites?.testcase?.filter((t) => !t.failure && !t.skipped).length || 0}
        </Col>
        <Col className="text-danger">
          <b>Failure : </b>
          {testSuites?.testcase?.filter((t) => t.failure).length || 0}
        </Col>
        <Col className="text-warning">
          <b>Skipped : </b>
          {testSuites?.testcase?.filter((t) => t.skipped).length || 0}
        </Col>
      </Row>
      <Button
        color="primary"
        onClick={() => setCollapse(!collapse)}
        style={{ marginBottom: '1rem' }}>
        {collapse ? 'Expand All' : 'Compress All'}
      </Button>
      <ListGroup>
        {
          testSuites?.map((testSuite) => {
            if (!_.isEmpty(testSuite.testcase)) {
              i++;
              return (
                <TestCase
                  name={testSuite.name}
                  count={testSuite.testcase.length}
                  testCases={testSuite.testcase}
                  isOpen={collapse}
                  key={i.toString()}
                />
              );
            }
          })
        }
        {/* <TestCase
                name={'Test'}
                count={2}
                testCases={testSuites?testSuites[0].testcase: {}}
                isOpen={collapse}
                key={i.toString()}
              /> */}
      </ListGroup>
    </div>
  );
};

export default TestSuite;
