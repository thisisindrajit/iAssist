import React, { useEffect, useState } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import { useChannel } from "./AblyReactEffect";

const AblyChatComponent = ({ channelName }) => {
  let inputBox = null;
  let messageEnd = null;
  const authUser = useGoogleAuth();

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel(channelName, (message) => {
    // Here we're computing the state that'll be drawn into the message history
    // We do that by slicing the last 199 messages from the receivedMessages buffer

    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);

    // Then finally, we take the message history, and combine it with the new message
    // This means we'll always have up to 199 message + 1 new message, stored using the
    // setMessages react useState hook
  });

  const sendChatMessage = (messageText) => {
    console.log(authUser.uid);
    channel.publish({ name: authUser.uid, data: messageText });
    setMessageText("");
    inputBox.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <span key={index} data-author={author} data-author-id={authUser.uid}>
        {message.data}
      </span>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div>
      <div>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>{" "}
      </div>
      <form onSubmit={handleFormSubmission}>
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button type="submit" disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AblyChatComponent;
