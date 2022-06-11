import ChatBox from "./ChatBox";

const { useState } = require("react");

const DiscussionBox = ({ discussionData }) => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <div className="text-sm flex flex-col gap-4 mb-16">
        <ChatBox
          discussion="Add few elements like the location of the company and no of visits in the footer to make the website more informative and xa appealing. Add few elements like the location of the company and no of visits in the footer to make the website more informative and visually appealing."
          userName="You"
          discussedOn="23/10/2021"
          isUser
        />
        <ChatBox
          discussion="Add few elements like the location of the company and no of visits in the footer to make the website more informative and xa appealing. Add few elements like the location of the company and no of visits in the footer to make the website more informative and visually appealing."
          userName="Dhilip"
          discussedOn="23/10/2021"
        />
        <ChatBox
          discussion="Changed status from pending to in progress."
          isUpdate
        />
        <ChatBox
          discussion="Add few elements like the location of the company and no of visits in the footer to make the website more informative and xa appealing. Add few elements like the location of the company and no of visits in the footer to make the website more informative and visually appealing."
          userName="Dhilip"
          discussedOn="23/10/2021"
        />
      </div>
      {/* Send message textbox */}
      <div
        style={{ left: "20%" }}
        className="fixed px-6 py-4 bottom-0 w-4/5 flex gap-2 bg-gray-100"
      >
        <input
          className="p-2 w-full text-sm shadow-xl outline-none border-2 border-medium-blue-1 rounded-md"
          type="text"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="bg-medium-blue-1 shadow-xl px-4 py-2 text-sm rounded-md text-white flex items-center justify-center">
          Send
        </div>
      </div>
    </div>
  );
};

export default DiscussionBox;
