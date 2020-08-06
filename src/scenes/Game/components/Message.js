import React, { useEffect, useRef } from 'react';

const Message = ({ text }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoViewIfNeeded();
  }, []);

  return <div ref={ref}>{text}</div>;
};

export default Message;
