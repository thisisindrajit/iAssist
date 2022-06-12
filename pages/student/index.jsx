import Head from "next/head";
import TitleWithLine from "../../components/TitleWithLine";
import Stats from "../../components/User/Stats";
import StudentQueryBox from "../../components/User/StudentQueryBox";
import studentLayout from "../../layouts/studentLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import Image from "next/image";
import Link from "../../components/Link";

const StudentHome = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  // TODO: Get data from API
  const sampleStats = {
    queries: "5",
    resolvedQueries: "3",
    unresolvedQueries: "2",
  };

  return !loading && authUser ? (
    <div>
      <Head>
        <title>{authUser.name} - Home</title>
      </Head>
      {/* New query button */}
      <Link href="/student/query/newquery">
        <div className="rounded-full fixed p-6 bottom-6 right-6 cursor-pointer bg-medium-purple-1 flex items-center justify-center h-10 w-10 z-10 query-box-shadow">
          <Image src="/svg/plus.svg" layout="fill" objectFit="contain" />
        </div>
      </Link>
      {/* Welcome section */}
      <div className="text-2xl text-dark-grey">
        ☀️ Good day, <span className="font-bold">{authUser.name}</span>
      </div>
      {/* Stats Section */}
      <Stats userType="student" stats={sampleStats} />
      {/* Unresolved Queries */}
      <a id="unresolved"></a>
      <TitleWithLine title="Unresolved Queries" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <StudentQueryBox
          title="What is useEffect in React?"
          status="pending"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
        />

        <StudentQueryBox
          title="What is useEffect in React?"
          status="completed"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="backend"
          href="/student/query/123"
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="in progress"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="pending"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="other"
          href="/student/query/123"
        />
      </div>
      {/* Resolved Queries */}
      <a id="resolved"></a>
      <TitleWithLine title="Resolved Queries" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <StudentQueryBox
          title="What is useEffect in React?"
          status="pending"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
          isResolved
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="completed"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="backend"
          href="/student/query/123"
          isResolved
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="in progress"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          href="/student/query/123"
          isResolved
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="pending"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="other"
          href="/student/query/123"
          isResolved
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default StudentHome;

StudentHome.Layout = studentLayout;
