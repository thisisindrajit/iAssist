import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomInput from "../../../components/User/CustomInput";
import { useGoogleAuth } from "../../../context/GoogleAuthContext";
import studentLayout from "../../../layouts/studentLayout";
import postData from "../../../utilities/api/postData";

const { default: Head } = require("next/head");
const { default: BackButton } = require("../../../components/BackButton");

const NewQuery = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [queryCreating, setQueryCreating] = useState(false);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (authUser) {
      setQueryCreating(true);

      const queryDetails = {
        title: title,
        description: description,
        category: category,
        query_status: "unresolved",
        student_id: authUser.uid,
      };

      const token = await authUser.getIdToken();

      // set query details in backend here
      const newQueryId = await postData(
        "/query/createQuery",
        token,
        queryDetails
      );

      setQueryCreating(false);

      router.push(`/student/query/${newQueryId.queryId}/chat`);
    }
  };

  return (
    <div>
      <Head>
        <title>New query - iAssist</title>
      </Head>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <BackButton router={router} />
          {/* Title and button */}
          <div className="flex justify-between items-center w-full">
            <div className="text-medium-blue-1 text-xl font-bold">
              Ask a new query
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="mt-8">
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col gap-10"
          >
            <CustomInput
              title="Query title"
              placeholder="Enter the title of the query"
              value={title}
              setValue={setTitle}
              info={"REQUIRED | Title can be upto 250 characters."}
              maxLen={250}
            />
            <CustomInput
              title="Query description"
              placeholder="Write down your query in detail..."
              value={description}
              setValue={setDescription}
              info={"REQUIRED"}
              maxLen={5000}
              isTextArea
            />
            <CustomInput
              title="Query category"
              placeholder="Enter the category of query"
              value={category}
              setValue={setCategory}
              info={
                "REQUIRED | Category is used to describe in which domain the query belongs to. Max characters allowed is 50."
              }
              maxLen={50}
            />
            {/* Submit and cancel buttons */}
            <div className="flex items-center gap-2">
              <div
                className="bg-red-500 rounded-md p-3 text-white w-fit text-sm cursor-pointer"
                onClick={() => router.push("/student")}
              >
                Cancel
              </div>
              <input
                type="submit"
                className="bg-medium-blue-1 rounded-md p-3 text-white w-fit text-sm cursor-pointer"
                value="Create query and move to chat room"
              />
              <div></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewQuery;

NewQuery.Layout = studentLayout;
