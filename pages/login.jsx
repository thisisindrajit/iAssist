import Head from "next/head";
import LpTopBar from "../components/LpTopBar";
import GlassCard from "../components/GlassCard";
import Holder from "../components/Holder";

const Login = () => {
  const login = () => {
    console.log("Login functionality");
  };

  return (
    <Holder>
      <Head>
        <title>Login - iAssist</title>
      </Head>
      {/* Login page */}
      <LpTopBar showSignIn={false} />
      <div className="m-auto pb-16 flex flex-col items-center">
        <div className="h-fit flex flex-col items-center justify-center border-2 p-6 md:p-8 rounded-md bg-lp-yellow border-gold-yellow gap-4 glow w-fit">
          <span className="leading-loose text-base text-center">
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
        </div>
      </div>
    </Holder>
  );
};

export default Login;
