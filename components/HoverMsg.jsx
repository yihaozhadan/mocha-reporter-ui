import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const HoverMsg = ({ index, name, message }) => {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <div>
      <span id={'hover' + index}>{name}</span>
      <Tooltip
        style={{ maxWidth: '600px' }}
        placement="auto"
        isOpen={isOpen}
        target={'hover' + index}
        toggle={toggleOpen(!isOpen)}>
        {message}
      </Tooltip>
    </div>
  );
};

export default HoverMsg;
