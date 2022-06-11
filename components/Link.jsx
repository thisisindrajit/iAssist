import NextLink from "next/link";

const Link = ({ href, children }) => {
  return <NextLink href={href}>{children}</NextLink>;
};

export default Link;
