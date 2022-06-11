import Link from "./Link";
import Image from "next/image";
const LpTopBar = ({ showSignIn }) => {
  return (
    <div className="w-screen p-8 flex items-center justify-between">
      {/* Logo */}
      <Link href="/">
        <div className="flex gap-4 items-center cursor-pointer">
          <Image src="/logo.png" height="28" width="28" />
          <div className="text-lg">iAssist</div>
        </div>
      </Link>
      {/* Login anchor link */}
      {showSignIn && (
        <Link href="/login">
          <div className="cursor-pointer hover:underline transition-all">
            Sign in
          </div>
        </Link>
      )}
    </div>
  );
};

export default LpTopBar;
