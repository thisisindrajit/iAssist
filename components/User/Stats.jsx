const Stats = ({ userType, stats }) => {
  // Show different stats based on different type of user
  return (
    <div className="bg-stats-bg p-4 mt-6 rounded-md">
      <div className="text-lg font-bold text-medium-blue-1">
        {userType === "student"
          ? "Total queries asked"
          : "Your reputation points"}
      </div>
      {/* Query count/points */}
      <div className="text-2xl text-dark-grey mt-1 font-bold">
        {userType === "student" ? stats.queries : stats.points}
      </div>
      {/* Extra stats */}
      <div className="text-sm font-bold mt-6">
        {userType === "student" ? (
          <div className="flex gap-2">
            <span className="text-green-500">
              {stats.resolvedQueries} resolved queries
            </span>{" "}
            |{" "}
            <span className="text-red-400">
              {stats.unresolvedQueries} unresolved queries
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            <span className="text-purple-500">
              {stats.inProgressQueries} in progress queries
            </span>{" "}
            |{" "}
            <span className="text-red-400">
              {stats.pendingQueries} pending queries
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
