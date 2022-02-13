import React, { useState } from 'react';
import './ScrollButton.module.css';

const ScrollButton = ({ scrollStepInPx, delayInMs }) => {
  const [intervalId, setIntervalId] = useState(0);
  const scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  };

  const scrollToTop = () => {
    setInterval(scrollStep, delayInMs);
    setIntervalId(intervalId);
  };

  return (
    <div>
      <button
        title="Back to top"
        className="scroll"
        onClick={() => {
          scrollToTop();
        }}>
        <span className="arrow-up fas fa-chevron-up"></span>
      </button>
    </div>
  );
};

export default ScrollButton;
