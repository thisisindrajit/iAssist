import React, { useEffect, useState } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import ChatBox from "../User/ChatBox";
import { useChannel } from "./AblyReactEffect";

const AblyChatComponent = ({ channelName }) => {
  let inputBox = null;
  let messageEnd = null;
  const { authUser } = useGoogleAuth();

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
    channel.publish({ name: authUser.name, data: messageText });
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
    const author =
      message.connectionId === ably.connection.id ? "Me" : message.name;
    return (
      // <span key={index} data-author={author} data-author-id={authUser.uid}></span>
      <ChatBox
        key={index}
        discussion={message.data}
        userName={author}
        isUser={author === "Me"}
      />
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div>
      <div className="text-sm flex flex-col gap-4">
        {messages.length > 0 ? messages : <div className="m-auto my-4 font-bold">No messages yet!</div>}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>

      <form onSubmit={handleFormSubmission}>
        <div className="sticky px-6 py-4 w-full rounded-md flex gap-2 bg-gray-100">
          <input
            ref={(element) => {
              inputBox = element;
            }}
            className="p-2 w-full text-sm shadow-xl outline-none border-2 border-medium-blue-1 rounded-md"
            type="text"
            placeholder="Write a message"
            value={messageText}
            onKeyPress={handleKeyPress}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-medium-blue-1 shadow-xl px-4 py-2 text-sm rounded-md text-white flex items-center justify-center"
            disabled={messageTextIsEmpty}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AblyChatComponent;
