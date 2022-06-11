import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TitleWithLine from "../../components/TitleWithLine";
import Stats from "../../components/User/Stats";
import StudentQueryBox from "../../components/User/StudentQueryBox";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import studentLayout from "../../layouts/studentLayout";

const StudentHome = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();

  // TODO: Get data from API
  const sampleStats = {
    queries: "5",
    resolvedQueries: "3",
    unresolvedQueries: "2",
  };

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  return (
    <div className="min-h-screen p-6">
      <Head>
        <title>Student Home - iAssist</title>
      </Head>
      {/* Welcome section */}
      <div className="text-2xl text-dark-grey">
        ☀️ Good day, <span className="font-bold">Indrajit</span>
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
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="completed"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="backend"
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="in progress"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="pending"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="other"
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
          isResolved
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="completed"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="backend"
          isResolved
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="in progress"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="frontend"
          isResolved
        />
        <StudentQueryBox
          title="What is useEffect in React?"
          status="pending"
          assignedTo="Dhilip"
          askedOn="23/10/2021"
          category="other"
          isResolved
        />
      </div>
    </div>
  );
};

export default StudentHome;

StudentHome.Layout = studentLayout;
