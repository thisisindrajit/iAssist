import Image from "next/image";

const Stats = ({ userType, stats }) => {
  console.log(stats);
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
        {userType === "student" && stats.unresolved + stats.resolved}
        {userType === "mentor" && (
          <div className="flex items-center">
            {stats.points}
            <div className="relative h-10 w-10">
              <Image src="/ribbon.png" layout="fill" objectFit="contain" />
            </div>
          </div>
        )}
      </div>
      {/* Extra stats */}
      <div className="text-sm font-bold mt-6">
        {userType === "student" ? (
          <div className="flex gap-2">
            <span className="text-green-500">
              {stats.resolved} resolved{" "}
              {stats.resolved === 1 ? "query" : "queries"}
            </span>{" "}
            |{" "}
            <span className="text-red-400">
              {stats.unresolved} unresolved{" "}
              {stats.unresolved === 1 ? "query" : "queries"}
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            <span className="text-purple-500">
              {stats["in-progress"]} in progress{" "}
              {stats["in-progress"] === 1 ? "query" : "queries"}
            </span>{" "}
            |{" "}
            <span className="text-red-400">
              {stats.pending} pending{" "}
              {stats.pending === 1 ? "query" : "queries"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
