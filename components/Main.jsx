import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Layout } from '../components';
import { VisibleTestCaseList } from '../container';
import './style.css';

const Main = ( { title, loaded, onDrop } ) => {
  if ( loaded ) {
    return (
      <Layout title={ title }>
        <VisibleTestCaseList />
      </Layout>
    )
  }

  return (
    <Layout title={ title }>
      <Dropzone disabled={ false } accept={ ".xml" } multiple={ false } onDrop={ onDrop }>
        { ( { getRootProps, getInputProps } ) => (
          <section>
            <div className='zone' { ...getRootProps() }>
              <input { ...getInputProps() } />
              <p>Drag 'n' drop file here, or click to select file</p>
            </div>
          </section>
        ) }
      </Dropzone>
    </Layout>
  )
}

Main.propTypes = {
  title: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default Main