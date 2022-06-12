import Head from "next/head";
import BackButton from "../../../../components/BackButton";
import TitleWithLine from "../../../../components/TitleWithLine";
import QueryStatusIndicator from "../../../../components/User/QueryStatusIndicator";
import studentLayout from "../../../../layouts/studentLayout";
import DiscussionBox from "../../../../components/User/DiscussionBox";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGoogleAuth } from "../../../../context/GoogleAuthContext";

const SpecificQuery = () => {
  const router = useRouter();
  const { queryId } = router.query;
  const isResolved = false;
  const { authUser, loading } = useGoogleAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  return (
    <div>
      <Head>
        <title>Query Title</title>
      </Head>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <BackButton router={router} />
          {/* Title and button */}
          <div className="flex justify-between items-center w-full">
            <div className="text-medium-blue-1 text-xl font-bold">
              What is useEffect in React?
            </div>
            <div className="bg-medium-green-1 cursor-pointer text-sm p-2.5 text-white rounded-md">
              Set Status
            </div>
          </div>
        </div>
        {/* Status, assigned to and category */}
        <div className="flex gap-2 items-center">
          <div className="bg-gold-yellow text-xs p-1.5 text-white rounded-md capitalize">
            frontend
          </div>
          {!isResolved && <QueryStatusIndicator status="pending" />}
          <div className="border-2 text-medium-blue-1 text-xs rounded-md border-medium-blue-1 py-1 px-2 w-fit">
            Asked on 23/10/2021
          </div>
          <div className="text-xs font-bold text-medium-grey">
            Assigned to Dhilip
          </div>
        </div>
        {/* Description */}
        <div className="text-sm text-medium-grey leading-loose text-justify">
          Add few elements like the location of the company and no of visits in
          the footer to make the website more informative and visually
          appealing. Add few elements like the location of the company and no of
          visits in the footer to make the website more informative and visually
          appealing. Add few elements like the location of the company and no of
          visits in the footer to make the website more informative and visually
          appealing. Add few elements like the location of the company and no of
          visits in the footer to make the website more informative and visually
          appealing.
        </div>
      </div>
      {/* Discussion */}
      <TitleWithLine title="Discussion" className="mt-8 mb-4" />
      <DiscussionBox discussion={[]} />
    </div>
  );
};

export default SpecificQuery;

SpecificQuery.Layout = studentLayout;
