import { useState } from "react";
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
  const { queryId } = router.query;

  const closeModal = async () => {
    if (authUser) {
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
  };

  return (
    <div>
      <Head>
        <title>Query chat - iAssist</title>
      </Head>
      <Modal isOpen={open} onRequestClose={closeModal}>
        {/* query and close button */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-medium-blue-1 text-lg font-bold">
            Query title goes here
          </div>
          <div
            className="bg-red-500 text-sm p-2 text-white rounded-md cursor-pointer"
            onClick={closeModal}
          >
            Close
          </div>
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
