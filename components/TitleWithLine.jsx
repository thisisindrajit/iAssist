const TitleWithLine = ({ title, className }) => {
  return (
    <div className="mb-4">
      <div
        className={`text-xl text-medium-blue-1 mb-4 ${className}`}
      >
        {title}
      </div>
      <div className="h-0.5 bg-gray-200 w-full"></div>
    </div>
  );
};

export default TitleWithLine;
