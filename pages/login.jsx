import Head from "next/head";
import LpTopBar from "../components/LpTopBar";
import GlassCard from "../components/GlassCard";
import Holder from "../components/Holder";
import { useRouter } from "next/router";
import { useGoogleAuth } from "../context/GoogleAuthContext";
import { login } from "../utilities/googleAuthUtilities";
import { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const { authUser, loading } = useGoogleAuth();
  const [showSignInButton, setShowSignInButton] = useState(false);

  // NOTE: If user is already logged in, redirect them to their home
  useEffect(() => {
    if (!loading && authUser) {
      router.push(`/${authUser.userType}`);
    }
  }, [authUser, loading]);

  // Initially set selected user type in local storage to empty
  useEffect(() => {
    localStorage.setItem("selectedUserType", "");
  }, []);

  return (
    <Holder>
      <Head>
        <title>Login - iAssist</title>
      </Head>
      {/* Login page */}
      <LpTopBar showSignIn={false} />
      <div className="m-auto pb-16 flex flex-col items-center">
        <div className="h-fit flex flex-col items-center justify-center border-2 p-6 md:p-8 rounded-md bg-lp-yellow border-gold-yellow gap-4 glow w-fit">
          <span className="leading-loose text-base text-center font-bold">
            Are you a student or a mentor?
          </span>
          {/* Radio buttons */}
          <div class="flex flex-col">
            <div className="flex justify-center gap-6 mb-2">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gold-yellow checked:border-gold-yellow focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="student"
                  value="option1"
                  onClick={() => {
                    localStorage.setItem("selectedUserType", "student");
                    setShowSignInButton(true);
                  }}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="student"
                >
                  Student
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gold-yellow checked:border-gold-yellow focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="mentor"
                  value="option2"
                  onClick={() => {
                    localStorage.setItem("selectedUserType", "mentor");
                    setShowSignInButton(true);
                  }}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="mentor"
                >
                  Mentor
                </label>
              </div>
            </div>
            <GlassCard className="p-4 mt-4 text-sm leading-loose text-center w-fit">
              In case the wrong user type is selected and the user is found in
              database, the user will be redirected to the correct dashboard.
            </GlassCard>
          </div>
          {showSignInButton && (
            <>
              {/* Horizontal line */}
              <div className="h-0.5 bg-black w-full"></div>
              {/* Sign in/ Sign up button */}
              <span className="font-bold leading-loose text-base text-center">
                Whether you want to sign in or sign up, just click on the button
                below!
              </span>
              <button
                className="p-3 md:py-3 md:px-4 w-fit rounded-md flex items-center gap-2 border-2 border-black bg-transparent hover:bg-black hover:text-white transition-all text-sm md:text-sm"
                onClick={() => login()}
              >
                <img
                  src="/svg/googleLogo.svg"
                  alt="Google logo"
                  className="h-5 w-5"
                />
                Sign in with Google
              </button>
              <GlassCard className="p-4 mt-4 text-sm leading-loose text-center w-fit">
                We only use “Sign in with Google” for a safe and seamless
                authentication!
              </GlassCard>
            </>
          )}
        </div>
      </div>
    </Holder>
  );
};

export default Login;
