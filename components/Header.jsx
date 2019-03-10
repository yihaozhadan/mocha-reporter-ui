import React from 'react';
import Dropzone from 'react-dropzone';
import xml2js from 'xml2js';
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

const parser = new xml2js.Parser({ mergeAttrs: true });

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      isOpen: false,
      filter: "All"
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
          console.log(result)
        });
    };
    files.forEach(file => reader.readAsBinaryString(file));
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  setFilter(filter) {
    this.setState({
      filter
    });
  }
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
                  <DropdownItem onClick={() => this.setFilter("All")}>
                    All
                  </DropdownItem>
                  <DropdownItem onClick={() => this.setFilter("Success")}>
                    Success
                  </DropdownItem>
                  <DropdownItem onClick={() => this.setFilter("Failure")}>
                    Failure
                  </DropdownItem>
                  <DropdownItem onClick={() => this.setFilter("Skipped")}>
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