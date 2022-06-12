import { useEffect, useState } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import Link from "../Link";
import QueryStatusIndicator from "./QueryStatusIndicator";

const StudentQueryBox = ({
  title,
  status,
  assignedTo,
  askedOn,
  askedBy,
  category,
  isResolved,
  href,
}) => {
  const { authUser } = useGoogleAuth();
  const [mentorName, setMentorName] = useState(null);

  useEffect(() => {
    getUserName(assignedTo);
  }, [assignedTo]);

  const getUserName = async (uid) => {
    if (authUser) {
      let url = `/api/mentor/${uid}/getUser`;
      let token = await authUser.getIdToken();

      const name = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const nameJSON = await name.json();

      setMentorName(nameJSON.name);
    }
  };

  return (
    <Link href={href}>
      <div
        style={{ borderWidth: "1px" }}
        className="flex flex-col gap-3 p-4 query-box-shadow border-gray-200 rounded-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer"
      >
        {/* title */}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-medium-blue-1 font-bold">
          {title}
        </div>
        {/* status and assigned to / asked by */}
        <div className="flex gap-2 items-center">
          {!isResolved && status && <QueryStatusIndicator status={status} />}
          {assignedTo && (
            <div className="text-xs font-bold text-medium-grey">
              {mentorName ? `Assigned to ${mentorName}` : "..."}
            </div>
          )}
          {askedBy && (
            <div className="text-xs font-bold text-medium-grey">
              Asked by {askedBy}
            </div>
          )}
        </div>
        {/* Asked on and category */}
        <div className="flex gap-2 items-center">
          <div className="border-2 text-medium-blue-1 text-xs rounded-md border-medium-blue-1 p-2 w-fit">
            Asked on {askedOn}
          </div>
          <div className="bg-gold-yellow text-sm p-2 text-white rounded-md capitalize">
            {category}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentQueryBox;
