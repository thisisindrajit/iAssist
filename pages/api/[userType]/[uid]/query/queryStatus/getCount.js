import { resolved } from "./resolved";
import { unresolved } from "./unresolved";
import { withAuth } from "/utilities/withAuth";

export const getCount = async (userType, uid) => {
    const resolvedQueries = await resolved(userType, uid);
    const unresolvedQueries = await unresolved(userType, uid);
    return {
        "resolved" : resolvedQueries.length, 
        "unresolved" : unresolvedQueries.length};
};

async function handler(req, res) {
    try{
        const {userType, uid} = req.query;
        return res.status(200).json(await getCount(userType, uid));
    }
    catch(error){
        console.error("Error in getting count of queries ", error);
        return res.status(500).json({ error: "Error in getting count of queries" });
    }
    
}

export default withAuth(handler);