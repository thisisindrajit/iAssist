import { useState, useEffect } from "react";
import studentLayout from "../../../../layouts/studentLayout";
import Modal from "react-modal";
import Head from "next/head";
import { useRouter } from "next/router";
import AblyChatComponent from "../../../../components/Ably/AblyChatComponent";
import postData from "../../../../utilities/api/postData";
import { useGoogleAuth } from "../../../../context/GoogleAuthContext";

const QueryChat = () => {
  const router = useRouter();
  const { authUser } = useGoogleAuth();

  const [open, setOpen] = useState(true);
  const [queryDetails, setQueryDetails] = useState(null);
  const { queryId } = router.query;

  const closeModal = async () => {
    if (authUser && authUser.userType === "student") {
      const token = await authUser.getIdToken();

      const details = {
        mentor_id: "MglWxeKSjZaNLmUsP1gkpkW89sA2",
        ticket_status: "pending",
      };

      // assign random mentor
      await postData(`/api/query/${queryId}/updateQueryField`, token, details);

      setOpen(false);
      router.push(`/${authUser.userType}`);
    }

    setOpen(false);
    router.push(`/${authUser.userType}`);
  };

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

  return (
    <div>
      <Head>
        <title>Query chat - iAssist</title>
      </Head>
      <Modal isOpen={open} onRequestClose={closeModal}>
        {/* query and close button */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-medium-blue-1 text-lg font-bold">
            {queryDetails ? queryDetails.title : "Loading Title..."} 
          </div>
          <div
            className="bg-red-500 text-sm p-2 text-white rounded-md cursor-pointer"
            onClick={closeModal}
          >
            Close
          </div>
        </div>
        {/* Description */}
        <div className="bg-gray-100 rounded-md p-4 w-full text-sm leading-loose text-medium-grey mt-4 mb-6">
          {queryDetails ? queryDetails.description : "Loading Description..."} 
        </div>
        {/* Discussion */}
        {/* <DiscussionBoxForQuery discussion={[]} /> */}
        <AblyChatComponent channelName={queryId?.toString()} />
      </Modal>
    </div>
  );
};

export default QueryChat;

QueryChat.Layout = studentLayout;
