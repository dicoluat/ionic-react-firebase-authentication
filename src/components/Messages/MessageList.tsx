import React from 'react';

import MessageItem from './MessageItem';

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}:any) => (
  <ul>
    {messages.map( (message:any) => (
      <MessageItem
        authUser={authUser}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default MessageList;
