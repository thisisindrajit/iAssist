import SideBar from "../components/User/SideBar";

const studentLayout = ({ children }) => {
  
  return (
    <div className="flex">
      <SideBar userType={1} />
      <div className="w-4/5 min-h-screen p-6" style={{ marginLeft: "20%" }}>
        {children}
      </div>
    </div>
  );
};

export default studentLayout;
