const ChatBox = ({ discussion, discussedOn, userName, isUser, isUpdate }) => {
  return !isUpdate ? (
    <div
      style={{ borderWidth: "1px" }}
      className={`flex flex-col gap-3 py-4 px-6 query-box-shadow border-gray-200 rounded-lg leading-loose w-4/5 text-justify ${
        isUser && "m-auto mr-0"
      }`}
    >
      <div>{discussion}</div>
      {discussedOn ? (
        <div className="text-gold-yellow">
          {userName} on {discussedOn}
        </div>
      ) : (
        <div className="text-gold-yellow">{userName}</div>
      )}
    </div>
  ) : (
    <div className="text-medium-purple-1 update">{discussion}</div>
  );
};

export default ChatBox;
