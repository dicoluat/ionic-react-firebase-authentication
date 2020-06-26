import React, {Component} from 'react';
import {IonButton, IonButtons, IonItem, IonLabel} from "@ionic/react";

class MessageItem extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
      editText: this.props.message.text,
    });
  };

  onChangeEditText = (event: any) => {
    this.setState({editText: event.target.value});
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({editMode: false});
  };

  render() {
    const {authUser, message, onRemoveMessage} = this.props;
    const {editMode, editText} = this.state;

    return (
      <IonItem>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <IonLabel>
            <div><strong>{message.userId}</strong></div>
            <div>
              {message.text}
              {message.editedAt && <span>(Edited)</span>}
            </div>
          </IonLabel>
        )}

        {authUser.uid === message.userId && (
          <IonButtons>
            {editMode ? (
              <span>
                <IonButton onClick={this.onSaveEditText}>Save</IonButton>
                <IonButton onClick={this.onToggleEditMode}>Reset</IonButton>
              </span>
            ) : (
              <IonButton onClick={this.onToggleEditMode}>Edit</IonButton>
            )}

            {!editMode && (
              <IonButton
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
              >
                Delete
              </IonButton>
            )}
          </IonButtons>
        )}
      </IonItem>
    );
  }
}

export default MessageItem;
