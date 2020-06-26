import React, {Component} from 'react';

import {AuthUserContext} from '../Session';
import {withFirebase} from '../Firebase';
import MessageList from './MessageList';
import {IonButton, IonCard, IonInput, IonItem, IonLabel, IonList, IonTextarea} from "@ionic/react";

class Messages extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({loading: true});

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', (snapshot: any) => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({messages: null, loading: false});
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = (event: any) => {
    this.setState({text: event.target.value});
  };

  onCreateMessage = (event: any, authUser: any) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({text: ''});

    event.preventDefault();
  };

  onEditMessage = (message: any, text: any) => {
    const {uid, ...messageSnapshot} = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = (uid: any) => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      {limit: this.state.limit + 5},
      this.onListenForMessages,
    );
  };

  render() {
    const {text, messages, loading} = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <IonList>
                <IonItem>
                  <IonLabel position={'stacked'}>Message</IonLabel>
                  <IonTextarea
                    placeholder={'Your message'}
                    value={text}
                    onChange={this.onChangeText}
                  />
                </IonItem>
              </IonList>
              <IonButton slot={'end'} type="submit">Send</IonButton>

            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
