const QueryStatusIndicator = ({ status }) => {
  const statusAndRespectiveColors = {
    pending: "#F43C3C",
    completed: "#0C977F",
    "in progress": "#7875D6",
  };

  return (
    <div
      className="text-white w-fit p-1.5 rounded-md text-xs capitalize"
      style={{
        backgroundColor:
          statusAndRespectiveColors[status.toString().toLowerCase()],
      }}
    >
      {status}
    </div>
  );
};

export default QueryStatusIndicator;
