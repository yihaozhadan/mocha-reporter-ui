import React from 'react';
import Dropzone from 'react-dropzone'
import xml2js from 'xml2js';
import Layout from '../components/Layout';
import TestSuite from '../components/TestSuite';
import {connect} from 'react-redux';
import {loadTestSuites} from '../actions/testCaseActions';
import './style.css';

const parser = new xml2js.Parser({ mergeAttrs: true });

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = (files) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const data = reader.result;
        parser.parseString(data, (err, result) => {
          if (err) {
            console.error(err.stack);
          }
          this.setState({title:result.testsuites.name || '', testSuite: result.testsuites.testsuite || [], loaded: true})
          props.dispatch(loadTestSuites(result.testsuites));
        });
      }
      files.forEach(file => reader.readAsBinaryString(file));
    }
    this.state = {title:'Upload unit test report', testSuite: [], loaded: false}
  }
  
  render() {
    if(!this.state.loaded) {
      return (
        <Layout title={this.state.title}>
          <Dropzone accept={".xml"} onDrop={this.onDrop}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div className='zone' {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </Layout>
      )
    } else {
      return (
        <Layout title={this.state.title}>
          <TestSuite testSuites={this.state.testSuite}/>
        </Layout>
      )
    }
  }
}

export default connect()(Index)