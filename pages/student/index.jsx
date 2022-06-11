import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import studentLayout from "../../layouts/studentLayout";
import { logout } from "../../utilities/googleAuthUtilities";

const StudentHome = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  return (
    <div className="h-screen w-4/5 p-6">
      <Head>
        <title>Student Home - iAssist</title>
      </Head>
      This is student home
      <div onClick={() => logout()}>Logout</div>
    </div>
  );
};

export default StudentHome;

StudentHome.Layout = studentLayout;
