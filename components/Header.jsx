import { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import xml2js from 'xml2js';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { visibilityFilters } from '../state/constants';
import { actions } from '../state';
const parser = new xml2js.Parser({ mergeAttrs: true });

const Header = ({ title }) => {
  const [isOpen, toggleOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const dispatch = useDispatch();
  const { loadTestSuites, setVisibilityFilter } = bindActionCreators(actions, dispatch);

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

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{title}</NavbarBrand>
        <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar active>
              <DropdownToggle nav caret>
                {filter}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  onClick={() => {
                    setFilter('All');
                    setVisibilityFilter(visibilityFilters.SHOW_ALL);
                  }}>
                  All
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilter('Success');
                    setVisibilityFilter(visibilityFilters.SHOW_SUCCESS_ONLY);
                  }}>
                  Success
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilter('Failure');
                    setVisibilityFilter(visibilityFilters.SHOW_FAILURE_ONLY);
                  }}>
                  Failure
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilter('Skipped');
                    setVisibilityFilter(visibilityFilters.SHOW_SKIPPED_ONLY);
                  }}>
                  Skipped
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem active>
              <Dropzone accept={'.xml'} multiple={false} onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <NavLink>New</NavLink>
                  </div>
                )}
              </Dropzone>
            </NavItem>
            <NavItem active>
              <NavLink href="https://github.com/yihaozhadan/mocha-reporter-ui">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
