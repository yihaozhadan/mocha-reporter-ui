import _ from 'lodash';
import xml2js from 'xml2js';
import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import { loadTestSuites } from '../actions';

const parser = new xml2js.Parser({ mergeAttrs: true });

const mapStateToProps = (state) => ({
  title: state.testSuites.name,
  loaded: !_.isEmpty(state.testSuites.testSuite),
  testSuites: state.testSuites.testSuite
});

const mapDispatchToProps = (dispatch) => ({
  onDrop: (files) => {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const data = reader.result;
      parser.parseString(data, (err, result) => {
        if (err) {
          console.error(err.stack);
        }
        if (result) {
          dispatch(loadTestSuites(result.testsuites));
        } else {
          console.warn('No valid data');
        }
      });
    };
    files.forEach((file) => reader.readAsBinaryString(file));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
