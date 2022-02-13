import { connect } from 'react-redux';
import TestSuite from '../components/TestSuite';
import { toggleTestSuite } from '../actions';

const getVisibleTestCases = (testSuites, filter) => {
  switch (filter) {
    case 'SHOW_SUCCESS_ONLY':
      return testSuites.map((testSuite) => ({
        ...testSuite,
        testcase: testSuite.testcase.filter((t) => !t.failure && !t.skipped)
      }));
    case 'SHOW_FAILURE_ONLY':
      return testSuites.map((testSuite) => ({
        ...testSuite,
        testcase: testSuite.testcase.filter((t) => t.failure && !t.skipped)
      }));
    case 'SHOW_SKIPPED_ONLY':
      return testSuites.map((testSuite) => ({
        ...testSuite,
        testcase: testSuite.testcase.filter((t) => t.skipped && !t.failure)
      }));
    case 'SHOW_ALL':
    default:
      return testSuites;
  }
};

const mapStateToProps = (state) => {
  let testSuites = getVisibleTestCases(state.testSuites.testSuite, state.visibilityFilter);
  let count = 0;
  testSuites.forEach((testSuite) => {
    count += parseInt(testSuite.tests);
  });
  const totalTests = count;
  count = 0;
  testSuites.forEach((testSuite) => {
    count += parseInt(testSuite.failures);
  });
  const failedTests = count;
  count = 0;
  testSuites.forEach((testSuite) => {
    count += parseInt(testSuite.skipped);
  });
  const skippedTests = count;
  const successTests = totalTests - failedTests - skippedTests;
  return {
    testSuites,
    totalTests,
    failedTests,
    skippedTests,
    successTests
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTestSuiteClick: (id) => {
      dispatch(toggleTestSuite(id));
    }
  };
};

const VisibleTestCaseList = connect(mapStateToProps, mapDispatchToProps)(TestSuite);

export default VisibleTestCaseList;
