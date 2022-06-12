import { useState } from "react";
import studentLayout from "../../../../layouts/studentLayout";
import Modal from "react-modal";
import Head from "next/head";
import { useRouter } from "next/router";
import DiscussionBoxForQuery from "../../../../components/User/DiscussionBoxForQuery";

const QueryChat = () => {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const { queryId } = router.query;

  const closeModal = () => {
    setOpen(false);
    router.push("/student");
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
        <DiscussionBoxForQuery discussion={[]} />
      </Modal>
    </div>
  );
};

export default QueryChat;

QueryChat.Layout = studentLayout;
