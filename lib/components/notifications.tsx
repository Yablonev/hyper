import React from 'react';

import {decorate} from '../utils/plugins';

import Notification_ from './notification';
import {NotificationsProps} from '../hyper';

const Notification = decorate(Notification_, 'Notification');

export default class Notifications extends React.PureComponent<NotificationsProps> {
  render() {
    return (
      <div className="notifications_view">
        {this.props.customChildrenBefore}
        {this.props.fontShowing && (
          <Notification
            key="font"
            backgroundColor="rgba(255, 255, 255, .2)"
            text={`${this.props.fontSize}px`}
            userDismissable={false}
            onDismiss={this.props.onDismissFont}
            dismissAfter={1000}
          />
        )}

        {this.props.resizeShowing && (
          <Notification
            key="resize"
            backgroundColor="rgba(255, 255, 255, .2)"
            text={`${this.props.cols}x${this.props.rows}`}
            userDismissable={false}
            onDismiss={this.props.onDismissResize}
            dismissAfter={1000}
          />
        )}

        {this.props.messageShowing && (
          <Notification
            key="message"
            backgroundColor="#FE354E"
            text={this.props.messageText}
            onDismiss={this.props.onDismissMessage}
            userDismissable={this.props.messageDismissable}
            userDismissColor="#AA2D3C"
          >
            {this.props.messageURL
              ? [
                  this.props.messageText,
                  ' (',
                  <a
                    key="link"
                    style={{color: '#fff'}}
                    onClick={(ev) => {
                      void window.require('electron').shell.openExternal(ev.currentTarget.href);
                      ev.preventDefault();
                    }}
                    href={this.props.messageURL}
                  >
                    more
                  </a>,
                  ')'
                ]
              : null}
          </Notification>
        )}
      </div>
    );
  }
}
