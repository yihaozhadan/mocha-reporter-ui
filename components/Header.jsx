import React from 'react';
import Dropzone from 'react-dropzone';
import xml2js from 'xml2js';
import {connect} from 'react-redux';
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
  DropdownItem } from 'reactstrap';
import {loadTestSuites, setVisibilityFilter, VisibilityFilters} from '../actions';
const parser = new xml2js.Parser({ mergeAttrs: true });

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.toggle = this.toggle.bind(this);
    //this.setFilter = this.setFilter.bind(this);
    this.state = {
      isOpen: false,
      //filter: "All"
    };
  }
  onDrop(files) {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const data = reader.result;
        parser.parseString(data, (err, result) => {
          if (err) {
            console.error(err.stack);
          }
          this.props.dispatch(loadTestSuites(result.testsuites));
        });
    };
    files.forEach(file => reader.readAsBinaryString(file));
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // setFilter(filter) {
  //   this.setState({
  //     filter
  //   });
  // }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="#">{ this.props.title }</NavbarBrand>
          <NavbarToggler onClick={ this.toggle } />
          <Collapse isOpen={ this.state.isOpen } navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar active>
                <DropdownToggle nav caret>
                  {this.state.filter}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.props.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))}>
                    All
                  </DropdownItem>
                  <DropdownItem onClick={() => this.props.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_SUCCESS_ONLY))}>
                    Success
                  </DropdownItem>
                  <DropdownItem onClick={() => this.props.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_FAILURE_ONLY))}>
                    Failure
                  </DropdownItem>
                  <DropdownItem onClick={() => this.props.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_SKIPPED_ONLY))}>
                    Skipped
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem active>
                <Dropzone accept={".xml"} multiple={false} onDrop={this.onDrop}>
                  {({getRootProps, getInputProps}) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <NavLink >Upload</NavLink>
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
  }
}

export default connect()(Header)