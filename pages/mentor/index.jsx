import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "../../components/Link";
import TitleWithLine from "../../components/TitleWithLine";
import Stats from "../../components/User/Stats";
import StudentQueryBox from "../../components/User/StudentQueryBox";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import mentorLayout from "../../layouts/mentorLayout";

const MentorHome = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();
  const [allQueryDetails, setAllQueryDetails] = useState(null);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  useEffect(() => {
    const getStatsDetails = async () => {
      if (authUser) {
        const token = await authUser.getIdToken();

        fetch(
          "api/" +
            authUser.userType +
            "/" +
            authUser.uid +
            "/query/queryStatus/getCount",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setAllQueryDetails(data);
          });
      }
    };

    getStatsDetails();
  }, [authUser]);

  console.log(allQueryDetails);

  return !loading && authUser ? (
    <div>
      <Head>
        <title>{authUser.name} - Home</title>
      </Head>
      {/* Welcome section */}
      <div className="flex justify-between items-center">
        <div className="text-2xl text-dark-grey">
          ☀️ Good day, <span className="font-bold">{authUser.name}</span>
        </div>
        <div className="border-2 border-medium-blue-1 p-2 rounded-md text-medium-blue-1 text-sm w-fit font-bold capitalize">
          {authUser.userType}
        </div>
      </div>
      {/* Stats Section */}
      {allQueryDetails && <Stats userType="mentor" stats={allQueryDetails} />}
      {/* Active Query Chats */}
      <a id="activequerychats"></a>
      <TitleWithLine title="Active Query Chats" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <StudentQueryBox
          title="What is useEffect in React?"
          askedBy="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
        />

        <StudentQueryBox
          title="What is useEffect in React?"
          askedBy="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          askedBy="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
        />
      </div>
      {/* Tickets assigned to me */}
      <a id="ticketsassigned"></a>
      <TitleWithLine title="Tickets assigned to me" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <StudentQueryBox
          title="What is useEffect in React?"
          status="completed"
          askedBy="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="pending"
          askedBy="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="completed"
          askedBy="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
          isResolved
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MentorHome;

MentorHome.Layout = mentorLayout;
