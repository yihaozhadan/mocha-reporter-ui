import React from 'react';
import { Tooltip } from 'reactstrap';

class HovertrMsg extends React.Component {
  constructor( props ) {
    super( props );
    this.toggle = this.toggle.bind( this );
    this.state = { isOpen: false };
  }
  toggle() {
    this.setState( { isOpen: !this.state.isOpen } );
  }
  render() {
    return(
      <div>
        <span id="hover">{ this.props.name }</span>
        <Tooltip style={ { maxWidth: "600px" } } placement="auto" isOpen={ this.state.isOpen } target={ "hover" } toggle={ this.toggle }>
          { this.props.message }
        </Tooltip>
      </div>
    );
  }
}

export default HovertrMsg;