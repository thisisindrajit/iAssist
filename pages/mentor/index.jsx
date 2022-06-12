import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGoogleAuth } from "../../context/GoogleAuthContext";
import studentLayout from "../../layouts/studentLayout";
import { logout } from "../../utilities/googleAuthUtilities";
import dynamic from "next/dynamic";

const AblyChatComponent = dynamic(() => import('../../components/Ably/AblyChatComponent'), { ssr: false });

const MentorHome = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push(`/`);
    }
  }, [authUser, loading]);

  return (
    <div className="h-screen w-4/5 p-6 absolute right-0 top-0">
      This is mentor home
      <AblyChatComponent channelName="123"/>
      <div onClick={() => logout()}>Logout</div>
    </div>
  );
};

export default MentorHome;

MentorHome.Layout = studentLayout;
