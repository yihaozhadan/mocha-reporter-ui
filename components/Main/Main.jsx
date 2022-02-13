import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Layout } from '..';
import { VisibleTestCaseList } from '../../container';
import './Main.module.css';

const Main = ({ title, loaded }) => {
  if (loaded) {
    return (
      <Layout title={title}>
        <VisibleTestCaseList />
      </Layout>
    );
  }

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Layout title={title}>
      <section>
        <div className="zone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop report file here, or click to select file</p>
        </div>
      </section>
    </Layout>
  );
};

Main.propTypes = {
  title: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired
};

export default Main;
