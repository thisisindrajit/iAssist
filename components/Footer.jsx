const Footer = () => {
  return (
    <div className="p-8 text-sm flex justify-end">
      {/* Created by attribution */}
      <div>
        Created with ❤️ by{" "}
        <a
          href="https://thisisindrajit.github.io/portfolio/"
          rel="noopener noreferrer"
          target="_blank"
          className="decoration underline"
        >
          Indrajit
        </a>{" "}
        and{" "}
        <a
          href="https://dhilipsanjay.github.io/"
          rel="noopener noreferrer"
          target="_blank"
          className="decoration underline"
        >
          Dhilip
        </a>
      </div>
    </div>
  );
};

export default Footer;
