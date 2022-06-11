import SideBar from "../components/User/SideBar";

const studentLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar userType={1} />
      {children}
    </div>
  );
};

export default studentLayout;
