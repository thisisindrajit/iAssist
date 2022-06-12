import { resolved } from "./resolved";
import { unresolved } from "./unresolved";
import { withAuth } from "/utilities/withAuth";

export const getCount = async (userType, uid) => {
  const resolvedQueries = await resolved(userType, uid);
  const unresolvedQueries = await unresolved(userType, uid);
  return {
    resolved: resolvedQueries.length,
    unresolved: unresolvedQueries.length,
  };
};

async function handler(req, res) {
  try {
    const { userType, uid } = req.query;
    const count = await getCount(userType, uid);

    return res.status(200).json(count);
  } catch (error) {
    console.error("Error in getting count of queries ", error);
    return res.status(500).json({ error: "Error in getting count of queries" });
  }
}

export default handler;
