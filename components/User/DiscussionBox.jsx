import { useGoogleAuth } from "../../context/GoogleAuthContext";
import ChatBox from "./ChatBox";
import convertToPrettyDateFormat from "/utilities/prettyDateFormat";
import postData from "../../utilities/api/postData";

const { useState } = require("react");

const DiscussionBox = ({ discussionData, queryId }) => {
  const [message, setMessage] = useState("");
  const { authUser } = useGoogleAuth();
  const [stateDiscussionData, setStateDiscussionData] =
    useState(discussionData);

  const onclickSend = async () => {
    if (authUser && message.length > 0) {
      let url = `/api/query/${queryId}/updates/createUpdate`;
      let token = await authUser.getIdToken();

      const details = {
        update_message: message,
        update_type: authUser.userType + "_update",
      };

      await postData(url, token, details);
      setStateDiscussionData([...stateDiscussionData, details]);
      setMessage("");
    } else {
      alert("Message must not be empty!");
    }
  };
  return (
    <div>
      <div className="text-sm flex flex-col gap-4 mb-16">
        {stateDiscussionData.length > 0 ? (
          stateDiscussionData.map((discussion, i) => {
            return (
              <ChatBox
                key={i}
                discussion={discussion.update_message}
                isUpdate={discussion.update_type === "status_update"}
                discussedOn={
                  discussion?.update_time?.seconds
                    ? convertToPrettyDateFormat(discussion.update_time.seconds)
                    : convertToPrettyDateFormat(new Date().getTime() / 1000)
                }
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
        <div
          onClick={() => onclickSend()}
          className="bg-medium-blue-1 shadow-xl px-4 py-2 text-sm rounded-md text-white flex items-center justify-center cursor-pointer"
        >
          Send
        </div>
      </div>
    </div>
  );
};

export default DiscussionBox;
