const QueryType = ({ title, count }) => {
  return (
    <div className="my-2 text-sm text-medium-grey hover:bg-white transition-all cursor-pointer p-3 rounded-md flex items-center justify-between">
      <div>{title}</div>
      {count && (
        <div className="bg-medium-blue-1 text-white rounded-full text-xs p-1 h-5 w-5 flex items-center justify-center">
          {count}
        </div>
      )}
    </div>
  );
};

export default QueryType;
