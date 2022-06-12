import Head from "next/head";
import TitleWithLine from "../../components/TitleWithLine";
import Stats from "../../components/User/Stats";
import StudentQueryBox from "../../components/User/StudentQueryBox";
import studentLayout from "../../layouts/studentLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import Image from "next/image";
import getData from "../../utilities/api/getData";
import { useQuery } from "react-query";

const StudentHome = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  const getStatsData = async () => {
    console.log(authUser)
    const token = await authUser.getIdToken();
    let data;
    let countData;
    if(authUser.userType === "student"){
      countData = await getData(authUser.userType + "/" + authUser.uid + "/query/queryStatus/getCount", token);
      data = await getData(authUser.userType + "/" + authUser.uid + "/query/queryStatus/all", token);
    }
    else{
      countData = await getData(authUser.userType + "/" + authUser.uid + "/query/ticketStatus/getCount", token);
      data = await getData(authUser.userType + "/" + authUser.uid + "/query/ticketStatus/all", token);
    }
    
    return { data, countData }
  }

  const { data, isLoading, isError } = useQuery(["stats-details"], getStatsData, {
    enabled: authUser ? true : false
  })

  if(!isLoading){
    console.log(data)
  }


  return !loading && authUser ? (
    <div>
      <Head>
        <title>{authUser.name} - Home</title>
      </Head>
      Test
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default StudentHome;

StudentHome.Layout = studentLayout;
