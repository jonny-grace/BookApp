import React, { useState } from 'react';

interface RefreshControlProps {
  onRefresh: () => void;
}

const RefreshControl: React.FC<RefreshControlProps> = ({ onRefresh }) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0].clientY);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.changedTouches[0].clientY);

    // Check if the user pulled down from the top -10
    if (touchEnd - touchStart < -10) {
      onRefresh();
    }
  };

  return (
    <div
      className="refresh-control"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
    </div>
  );
};

export default RefreshControl;