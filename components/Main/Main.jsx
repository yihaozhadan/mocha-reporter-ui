import { useCallback } from 'react';
import xml2js from 'xml2js';
import _ from 'lodash';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from '..';
import TestSuite from '../TestSuite';
import { actions } from '../../state';
import './Main.module.css';

const parser = new xml2js.Parser({ mergeAttrs: true });

const Main = () => {
  const storeState = useSelector((state) => state.testSuites);
  const dispatch = useDispatch();
  const { loadTestSuites } = bindActionCreators(actions, dispatch);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onabort = () => alert('file reading was aborted');
    reader.onerror = () => alert('file reading has failed');
    reader.onload = () => {
      const data = reader.result;
      parser.parseString(data, (err, result) => {
        if (err) {
          alert(err.stack);
        }
        if (result) {
          loadTestSuites(result.testsuites);
        } else {
          alert('No valid data');
        }
      });
    };
    acceptedFiles.forEach((file) => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Layout title={storeState.title}>
      {
        _.isEmpty(storeState.testSuite)?
        <section>
          <div className="zone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop report file here, or click to select file</p>
          </div>
        </section>
        :
        <TestSuite />
      }
    </Layout>
  );
};

export default Main;
