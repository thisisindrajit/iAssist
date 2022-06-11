import { useRouter } from "next/router";

const SpecificQuery = () => {
  const router = useRouter();
  const { queryId } = router.query;

  return <div>{queryId}</div>;
};

export default SpecificQuery;
