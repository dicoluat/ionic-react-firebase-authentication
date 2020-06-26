import React from 'react';

import MessageItem from './MessageItem';
import {IonList} from "@ionic/react";

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}:any) => (
  <IonList>
    {messages.map( (message:any) => (
      <MessageItem
        authUser={authUser}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </IonList>
);

export default MessageList;
