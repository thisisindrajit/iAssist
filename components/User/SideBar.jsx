import dynamic from "next/dynamic";
import QueryType from "./QueryType";
import { logout } from "../../utilities/googleAuthUtilities";
import { useEffect, useState } from "react";

// Dynamically loading the component with server side rendering to be false to generate different image each time
const RandomAvatar = dynamic(() => import("../RandomAvatar"), {
  ssr: false,
});

const SideBar = ({ userType }) => {
  const [userName, setUserName] = useState(null); //

  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("user"))["name"].split(" ")[0]);
  }, []);
  // Show different sidebars based on different type of user
  return (
    <div className="w-1/5 bg-sidebar-grey min-h-screen fixed p-6 flex flex-col justify-between">
      <div>
        {/* Welcome back section */}
        <div className="flex items-center gap-4">
          {/* Random logo */}
          <RandomAvatar className="rounded-full h-16 w-16 p-2 bg-gray-200" />
          <div>
            <div className="text-medium-grey">Welcome back,</div>
            <div className="text-dark-grey text-lg font-bold">
              {userName ? userName : "Student"}
            </div>
          </div>
        </div>
        {/* My Queries section */}
        <div className="mt-8 mb-4">
          <div className="text-lg text-medium-blue-1">My Queries</div>
          {/* Horizontal line */}
          <div className="h-0.5 mt-2 bg-gray-200 w-full"></div>
        </div>

        {/* Types of queries based on user */}
        {userType.toString().toLowerCase() === "student" ? (
          <div>
            <QueryType
              title="Unresolved Queries"
              // count="5"
              href="/student#unresolved"
            />
            <QueryType title="Resolved Queries" href="/student#resolved" />
          </div>
        ) : (
          <div>
            <QueryType
              title="Active Query Chats"
              // count="5"
              href="/mentor#activequerychats"
            />
            <QueryType
              title="Tickets assigned to me"
              href="/mentor#ticketsassigned"
            />
          </div>
        )}
      </div>
      <div onClick={() => logout()}>
        <QueryType title="Logout" />
      </div>
    </div>
  );
};

export default SideBar;
