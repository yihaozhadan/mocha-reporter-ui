import React from 'react';
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

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      isOpen: false,
      filter: "All"
    };
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
                <NavLink href="#">Upload</NavLink>
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