import React from "react";
import "./_input.scss";

export const Input = ({ message, sendMessage, setMessage }) => {
  return (
    <div>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Input;
