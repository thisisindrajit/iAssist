import Head from "next/head";
import TitleWithLine from "../../components/TitleWithLine";
import Stats from "../../components/User/Stats";
import StudentQueryBox from "../../components/User/StudentQueryBox";
import studentLayout from "../../layouts/studentLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import Image from "next/image";
import Link from "../../components/Link";

const StudentHome = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();
  const [allQueryDetails, setAllQueryDetails] = useState(null);
  const [allQueryCount, setAllQueryCount] = useState(null);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  useEffect(() => {
    const getStatsDetails = async () => {
      if (authUser) {
        const token = await authUser.getIdToken();
        let allQueryDetailsUrl, allQueryCountUrl;
        if(authUser.userType === "student"){
          allQueryDetailsUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/queryStatus/all";
          allQueryCountUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/queryStatus/getCount";
        }
        else{
          allQueryDetailsUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/ticketStatus/all";
          allQueryCountUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/ticketStatus/getCount";
        }

        fetch(
          allQueryDetailsUrl,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setAllQueryDetails(data);
          });

          fetch(
            allQueryCountUrl,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              setAllQueryCount(data);
            });
      }
    };

    getStatsDetails();
  }, [authUser]);

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
      {allQueryDetails && <Stats userType="student" stats={allQueryCount} />}
      {/* Unresolved Queries */}
      <a id="unresolved"></a>
      <TitleWithLine title="Unresolved Queries" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        {
          allQueryDetails && allQueryDetails.unresolved.length > 0 ? allQueryDetails.unresolved.map((queryDetails) => {
            return(<StudentQueryBox key={queryDetails.id}
            title={queryDetails.title}
            status={queryDetails.query_status}
            assignedTo={queryDetails.mentor_id}
            askedOn={"23/10/2021"}
            category={queryDetails.category}
            href={"/student/query/"+queryDetails.id}
          />)
          }) : <div>No queries</div>
        }
      </div>
      {/* Resolved Queries */}
      <a id="resolved"></a>
      <TitleWithLine title="Resolved Queries" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        {
            allQueryDetails && allQueryDetails.unresolved.length > 0 ? allQueryDetails.resolved.map((queryDetails) => {
            return(<StudentQueryBox key={queryDetails.id}
            title={queryDetails.title}
            status={queryDetails.query_status}
            assignedTo={queryDetails.mentor_id}
            askedOn={queryDetails.asked_on}
            category={queryDetails.category}
            href={"/student/query/"+queryDetails.id}
          />)
          }) : <div>No queries</div>
        }
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default StudentHome;

StudentHome.Layout = studentLayout;
