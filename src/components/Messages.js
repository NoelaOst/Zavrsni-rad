import React from "react";
import PropTypes from "prop-types";

class Messages extends React.Component {
  render() {
    return (
      <div>
        {this.props.messages.map((item, index) => {
          //   console.log("ovo je item", item); //all members id including mine, depending on who sends the message
          //   console.log("ovo je member", this.props.member); //currentuser/my id
          return (
            <div key={index} className="messages-wrapper">
              {item.member.id === this.props.member.id ? (
                <div className="my-message-container">
                  <div className="user-detail-container">
                    <div
                      className="avatar"
                      style={{ backgroundColor: item.member.color }}
                    ></div>
                    <p className="username">{item.member.username}</p>
                  </div>
                  <p className="my-message">{item.message}</p>
                </div>
              ) : (
                <div className="client-message-container">
                  <div className="user-detail-container">
                    <div
                      className="avatar"
                      style={{ backgroundColor: item.member.color }}
                    ></div>
                    <p className="username">{item.member.username}</p>
                  </div>
                  <p className="client-message">{item.message}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array,
  member: PropTypes.object,
};

export default Messages;
