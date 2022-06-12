import Head from "next/head";
import BackButton from "../../../../components/BackButton";
import TitleWithLine from "../../../../components/TitleWithLine";
import QueryStatusIndicator from "../../../../components/User/QueryStatusIndicator";
import studentLayout from "../../../../layouts/studentLayout";
import DiscussionBox from "../../../../components/User/DiscussionBox";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGoogleAuth } from "../../../../context/GoogleAuthContext";
import convertToPrettyDateFormat from "/utilities/prettyDateFormat"

const SpecificQuery = () => {
  const router = useRouter();
  const { queryId } = router.query;
  const isResolved = false;
  const { authUser, loading } = useGoogleAuth();
  const [queryDetails, setQueryDetails] = useState(null);

  const [mentorName, setMentorName] = useState(null);

  useEffect(() => {
    if (queryDetails) {
      getUserName(queryDetails.mentor_id);
    }
  }, [queryDetails]);

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

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/mentor`);
    }

    if (authUser && authUser.userType === "mentor") {
      router.push(`/`);
    }
  }, [authUser, loading]);

  useEffect(() => {
    const getQueryDetails = async () => {
      if (authUser) {
        const token = await authUser.getIdToken();
        let queryDetailsUrl = "/api/query/" + queryId;

        fetch(queryDetailsUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setQueryDetails(data);
          });
      }
    };

    getQueryDetails();
  }, [authUser]);

  return queryDetails ? (
    <div>
      <Head>
        <title>{queryDetails.title}</title>
      </Head>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <BackButton router={router} />
          {/* Title and button */}
          <div className="flex justify-between items-center w-full">
            <div className="text-medium-blue-1 text-xl font-bold">
              {queryDetails.title}
            </div>
            <div className="bg-medium-green-1 cursor-pointer text-sm p-2.5 text-white rounded-md">
              Set Status
            </div>
          </div>
        </div>
        {/* Status, assigned to and category */}
        <div className="flex gap-2 items-center">
          <div className="bg-gold-yellow text-xs p-1.5 text-white rounded-md capitalize">
            {queryDetails.category}
          </div>
          {!isResolved && (
            <QueryStatusIndicator status={queryDetails.ticket_status} />
          )}
          <div className="border-2 text-medium-blue-1 text-xs rounded-md border-medium-blue-1 py-1 px-2 w-fit">
            Asked on {convertToPrettyDateFormat(queryDetails.asked_on.seconds)}
          </div>
          <div className="text-xs font-bold text-medium-grey">
            {mentorName ? `Assigned to ${mentorName}` : "..."}
          </div>
        </div>
        {/* Description */}
        <div className="text-sm text-medium-grey leading-loose text-justify">
          {queryDetails.description}
        </div>
      </div>
      {/* Discussion */}
      <TitleWithLine title="Discussion" className="mt-8 mb-4" />
      <DiscussionBox discussionData={queryDetails.updates} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SpecificQuery;

SpecificQuery.Layout = studentLayout;
