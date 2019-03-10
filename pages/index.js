import _ from 'lodash';
import xml2js from 'xml2js';
import { connect } from 'react-redux';
import { Main } from '../components';
import { loadTestSuites } from '../actions/testCaseActions';

const parser = new xml2js.Parser( { mergeAttrs: true } );

const mapStateToProps = state => ({
  title: state.name,
  loaded: !_.isEmpty(state.testSuite),
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  onDrop: ( files ) => {
    const reader = new FileReader();
    reader.onabort = () => console.log( 'file reading was aborted' );
    reader.onerror = () => console.log( 'file reading has failed' );
    reader.onload = () => {
      const data = reader.result;
      parser.parseString( data, ( err, result ) => {
        if ( err ) {
          console.error( err.stack );
        }
        dispatch( loadTestSuites( result.testsuites ) );
      } );
    }
    files.forEach( file => reader.readAsBinaryString( file ) );
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Main )