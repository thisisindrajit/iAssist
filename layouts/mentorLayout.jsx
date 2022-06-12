import SideBar from "../components/User/SideBar";

const mentorLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar userType="mentor" />
      <div className="w-4/5 min-h-screen p-6" style={{ marginLeft: "20%" }}>
        {children}
      </div>
    </div>
  );
};

export default mentorLayout;
