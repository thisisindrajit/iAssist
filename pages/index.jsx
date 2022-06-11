import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Holder from "../components/Holder";
import LpTopBar from "../components/LpTopBar";

const Home = () => {
  return (
    <Holder className="bg-lp-yellow">
      <Head>
        <title>iAssist</title>
      </Head>
      {/* Top bar */}
      <LpTopBar showSignIn={true} />
      {/* Details and image holder */}
      <div className="flex px-10 justify-center items-center gap-10">
        {/* Details */}
        <div>
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">iAssist</div>
            <div className="text-base italic">
              (abbreviated as iNeuron Assist)
            </div>
            {/* Horizontal line */}
            <div className="h-0.5 bg-black w-full"></div>
            <div className="text-xl leading-relaxed">
              A{" "}
              <span className="font-bold italic">
                real-time chat support system
              </span>{" "}
              for students to clear their doubts with mentors.
            </div>
            {/* Login button */}
            <Link href="/login">
              <div className="border-2 border-black p-3 w-fit text-sm rounded-md cursor-pointer hover:bg-black hover:text-white transition-all">
                Start using iAssist!
              </div>
            </Link>
          </div>
        </div>
        <div className="w-2/5 h-96 relative">
          <Image
            src="/landing-page-illustration.jpg"
            layout="fill"
            objectFit="contain"
            alt="landing page illustration"
            priority={true}
          />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </Holder>
  );
};

export default Home;
