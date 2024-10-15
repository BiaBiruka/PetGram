import './Message.css';

import React from 'react';

const Message = ({ msg, type }) => {
  return <div className={`message ${type}`}>{msg}</div>;
};

export default Message;
