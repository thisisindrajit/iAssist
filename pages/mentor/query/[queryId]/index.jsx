import Head from "next/head";
import BackButton from "../../../../components/BackButton";
import TitleWithLine from "../../../../components/TitleWithLine";
import QueryStatusIndicator from "../../../../components/User/QueryStatusIndicator";
import DiscussionBox from "../../../../components/User/DiscussionBox";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGoogleAuth } from "../../../../context/GoogleAuthContext";
import mentorLayout from "../../../../layouts/mentorLayout";
import Swal from "sweetalert2";
import postData from "../../../../utilities/api/postData";
import convertToPrettyDateFormat from "/utilities/prettyDateFormat"

const SpecificQuery = () => {
  const router = useRouter();
  const { queryId } = router.query;
  const isResolved = false;
  const { authUser, loading } = useGoogleAuth();
  const [queryDetails, setQueryDetails] = useState(null);
  const [status, setStatus] = useState(null);

  const [studentName, setStudentName] = useState(null);

  const onStatusUpdateHandler = async () => {
    const inputOptions = {
      pending: "Pending",
      "in-progress": "In-Progress",
      completed: "Completed",
    };

    const { value } = await Swal.fire({
      title: "Select a status",
      input: "radio",
      inputOptions: inputOptions,
      customClass: "swal-custom",
      inputValidator: (value) => {
        if (!value) {
          return "You need to choose something!";
        }
      },
    });

    if (authUser && value) {
      setStatus(value);

      let url = `/api/query/${queryId}/updateUserField`;
      let token = await authUser.getIdToken();

      const details = {
        ticket_status: value,
      };

      await postData(url, token, details);

      url = `/api/query/${queryId}/updates/createUpdate`;

      details = {
        update_message: "Changed ticket status to " + value,
        update_type: "status_update"
      };

      await postData(url, token, details);
    }
  };

  useEffect(() => {
    if (queryDetails) {
      getUserName(queryDetails.student_id);
    }
  }, [queryDetails]);

  const getUserName = async (uid) => {
    if (authUser) {
      let url = `/api/student/${uid}/getUser`;
      let token = await authUser.getIdToken();

      const name = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const nameJSON = await name.json();

      setStudentName(nameJSON.name);
    }
  };

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }

    if (authUser && authUser.userType === "student") {
      router.push(`/student`);
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
            <div className="bg-medium-purple-1 cursor-pointer text-sm p-2.5 text-white rounded-md">
              Transfer Mentor
            </div>
          </div>
        </div>
        {/* Status, assigned to and category */}
        <div className="flex gap-2 items-center">
          <div className="bg-gold-yellow text-xs p-1.5 text-white rounded-md capitalize">
            {queryDetails.category}
          </div>
          {!isResolved && (
            <div onClick={onStatusUpdateHandler}>
              <QueryStatusIndicator
                status={status ? status : queryDetails.ticket_status}
                showArrow
              />
            </div>
          )}
          <div className="border-2 text-medium-blue-1 text-xs rounded-md border-medium-blue-1 py-1 px-2 w-fit">
            Asked on {convertToPrettyDateFormat(queryDetails.asked_on.seconds)}
          </div>
          <div className="text-xs font-bold text-medium-grey">
            {studentName ? `Asked by ${studentName}` : "..."}
          </div>
        </div>
        {/* Description */}
        <div className="text-sm text-medium-grey leading-loose text-justify">
          {queryDetails.description}
        </div>
      </div>
      {/* Discussion */}
      <TitleWithLine title="Discussion" className="mt-8 mb-4" />
      <DiscussionBox queryId={queryId} discussionData={queryDetails.updates} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SpecificQuery;

SpecificQuery.Layout = mentorLayout;
