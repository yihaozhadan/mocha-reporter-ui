import {connect} from 'react-redux';
import TestSuite from '../components/TestSuite';

const getVisibleTestcases = (testSuites, filter) => {
  switch (filter) {
    case 'SHOW_SUCCESS':
      return testSuites.forEach((testSuite) => testSuite.testcase.filter(t => t.failure == undefined && t.skipped == undefined));
    case 'SHOW_FAILURE':
      return testSuites.forEach((testSuite) => testSuite.testcase.filter(t => t.failure != undefined));
    case 'SHOW_SKIPPED':
      return testSuites.forEach((testSuite) => testSuite.testcase.filter(t => t.skipped != undefined));
    case 'SHOW_ALL':
    default:
      return testSuites;
  }
}

const mapStateToProps = state => {
  return {
    testSuites: getVisibleTestcases(state.testSuite, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTestSuiteClick: id => {
      dispatch(toggleTestSuite(id));
    }
  }
}

const VisibleTestCaseList = connect(mapStateToProps, mapDispatchToProps)(TestSuite);

export default VisibleTestCaseList