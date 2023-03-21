import React from "react";

class Input extends React.Component {
  state = {
    message: "",
  };

  onSendMessage = () => {
    this.props.sendMessage(this.state.message, "Ovo je drugi argument");
    this.setState({ message: "" });
  };

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onSendMessage();
    }
  };

  render() {
    return (
      <div className="input-container">
        <input
          type="text"
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.target.value })}
          onKeyPress={this.onKeyPress}
          placeholder="Write a message..."
          autoFocus
        />
        <button onClick={this.onSendMessage}>Send</button>
      </div>
    );
  }
}
export default Input;
