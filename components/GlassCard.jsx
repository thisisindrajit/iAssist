const GlassCard = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center glass-card ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
