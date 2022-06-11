import dynamic from "next/dynamic";

// Dynamically loading the component with server side rendering to be false to generate different image each time
const RandomAvatar = dynamic(() => import("../RandomAvatar"), {
  ssr: false,
});

const SideBar = ({ userType }) => {
  // Show different sidebars based on different type of user
  return (
    <div className="w-1/5 bg-sidebar-grey min-h-screen sticky p-6">
      {/* Welcome back section */}
      <div className="flex items-center gap-4">
        {/* Random logo */}
        <RandomAvatar className="bg-white rounded-full h-16 w-16" />
        <div>
          <div className="text-medium-grey">Welcome back,</div>
          <div className="text-dark-grey text-lg font-bold">Indrajit</div>
        </div>
      </div>
      {userType === 1 ? <div>Student</div> : <div>Mentor</div>}
    </div>
  );
};

export default SideBar;
