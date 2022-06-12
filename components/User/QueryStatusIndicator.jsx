import Image from "next/image";

const QueryStatusIndicator = ({ status, showArrow }) => {
  const statusAndRespectiveColors = {
    unresolved: "#F43C3C",
    pending: "#F43C3C",
    resolved: "#0C977F",
    completed: "#0C977F",
    "in-progress": "#7875D6",
  };

  return (
    status && (
      <div
        className={`text-white w-fit p-1.5 rounded-md text-xs capitalize flex items-center justify-center ${
          showArrow && "cursor-pointer"
        }`}
        style={{
          backgroundColor:
            statusAndRespectiveColors[status.toString().toLowerCase()],
        }}
      >
        {showArrow ? (
          <div className="flex items-center">
            <span>{status}</span>
            <Image src="/svg/down.svg" height="18" width="18" />
          </div>
        ) : (
          <div>{status}</div>
        )}
      </div>
    )
  );
};

export default QueryStatusIndicator;
