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
  const [allQueryCount, setAllQueryCount] = useState(null);
  const [activeChats, setactiveChats] = useState(null);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  useEffect(() => {
    const getStatsDetails = async () => {
      if (authUser) {
        const token = await authUser.getIdToken();
        let allQueryDetailsUrl, allQueryCountUrl, activeChatsUrl, getUserUrl;
        if(authUser.userType === "student"){
          allQueryDetailsUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/queryStatus/all";
          allQueryCountUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/queryStatus/getCount";
        }
        else{
          allQueryDetailsUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/ticketStatus/all";
          allQueryCountUrl = "api/" + authUser.userType + "/" + authUser.uid + "/query/ticketStatus/getCount";
        }

        activeChatsUrl = "api/query/getActiveChats";
        getUserUrl = "api/" + authUser.userType + "/" + authUser.uid + "/getUser";

        fetch(
          activeChatsUrl,
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
            setactiveChats(data);
          });
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
              fetch(
                getUserUrl,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((response) => response.json())
                .then((userData) => {
                  setAllQueryCount({
                    ...data,
                    points: userData.reputation_points
                  });
                });
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
      {/* Welcome section */}
      <div className="text-2xl text-dark-grey">
        ☀️ Good day, <span className="font-bold">{authUser.name}</span>
      </div>
      {/* Stats Section */}
      {allQueryCount && <Stats userType="mentor" stats={allQueryCount} />}
      {/* Active Query Chats */}
      <a id="activequerychats"></a>
      <TitleWithLine title="Active Query Chats" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
      {
        activeChats && activeChats.length > 0 ? activeChats.map((activeChat) => {
          return(<StudentQueryBox  key={activeChat.id}
            title={queryDetails.title}
            status={queryDetails.query_status}
            assignedTo={queryDetails.mentor_id}
            askedOn={"23/10/2021"}
            category={queryDetails.category}
            href={"/student/query/"+activeChat.id+"/chat"}
        />) 
          }) : <div>No queries</div>
        }
      </div>
      {/* Tickets assigned to me */}
      <a id="ticketsassigned"></a>
      <TitleWithLine title="Tickets assigned to me" className="mt-12 mb-4" />
      <div className="grid grid-cols-2 gap-4">
      {
          allQueryDetails && allQueryDetails.pending.length > 0 ? allQueryDetails.pending.map((queryDetails) => {
          return(<StudentQueryBox key={queryDetails.id}
            title={queryDetails.title}
            status={queryDetails.query_status}
            assignedTo={queryDetails.mentor_id}
            askedOn={queryDetails.asked_on.seconds}
            category={queryDetails.category}
            href={"/mentor/query/"+queryDetails.id}
        />)
      }) : <div>No Pending queries</div>
      }        
      </div>

      <div className="grid grid-cols-2 gap-4">
      {
          allQueryDetails && allQueryDetails.pending.length > 0 ? allQueryDetails["in-progress"].map((queryDetails) => {
          return(<StudentQueryBox key={queryDetails.id}
            title={queryDetails.title}
            status={queryDetails.query_status}
            assignedTo={queryDetails.mentor_id}
            askedOn={queryDetails.asked_on.seconds}
            category={queryDetails.category}
            href={"/mentor/query/"+queryDetails.id}
        />)
      }) : <div>No In Progress queries</div>
      }        
      </div>

      <div className="grid grid-cols-2 gap-4">
      {
          allQueryDetails && allQueryDetails.pending.length > 0 ? allQueryDetails.completed.map((queryDetails) => {
          return(<StudentQueryBox key={queryDetails.id}
            title={queryDetails.title}
            status={queryDetails.query_status}
            assignedTo={queryDetails.mentor_id}
            askedOn={queryDetails.asked_on.seconds}
            category={queryDetails.category}
            href={"/mentor/query/"+queryDetails.id}
        />)
      }) : <div>No Completed queries</div>
      }        
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MentorHome;

MentorHome.Layout = mentorLayout;
