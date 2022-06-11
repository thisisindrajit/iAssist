const Holder = ({ className, children }) => {
  return (
    <div className={`min-h-screen h-fit flex flex-col justify-between ${className}`}>
      {children}
    </div>
  );
};

export default Holder;