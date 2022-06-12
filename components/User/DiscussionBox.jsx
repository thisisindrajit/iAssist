import ChatBox from "./ChatBox";

const { useState } = require("react");

const DiscussionBox = ({ discussionData }) => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <div className="text-sm flex flex-col gap-4 mb-16">
        {discussionData.length > 0 ? (
          discussionData.map((discussion) => {
            return (
              <ChatBox
                discussion={discussion.update_message}
                isUpdate={discussion.update_type === "status_update"}
                discussedOn="23/10/2021"
              />
            );
          })
        ) : (
          <div className="m-auto my-4 font-bold">No discussions yet!</div>
        )}
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
