import convertToPrettyDateFormat from "../../utilities/prettyDateFormat";

const ChatBox = ({ discussion, discussedOn, userName, isUser, isUpdate }) => {
  return !isUpdate ? (
    <div
      style={{ borderWidth: "1px" }}
      className={`flex flex-col gap-2 py-3 px-6 query-box-shadow border-gray-200 rounded-lg leading-loose w-3/5 text-justify ${
        isUser && "m-auto mr-0 bg-stats-bg"
      }`}
    >
      <div className="font-semibold">{discussion}</div>
      {discussedOn ? (
        <div className="text-gold-yellow">
          {discussedOn}
        </div>
      ) : (
        <div className="text-gold-yellow">{userName} - {convertToPrettyDateFormat(new Date().getTime()/1000)}</div>
      )}
    </div>
  ) : (
    <div className="text-medium-purple-1 update">{discussion}</div>
  );
};

export default ChatBox;
