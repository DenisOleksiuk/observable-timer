import React from 'react';

const Display = ({ time }) => {
  const correctTime = (n) => (n < 10 ? `0${n}` : n);

  return (
    <div>
      <span>{correctTime(time.hours)}:</span>
      <span>{correctTime(time.minutes)}:</span>
      <span>{correctTime(time.seconds)}</span>
    </div>
  );
};

export default Display;
