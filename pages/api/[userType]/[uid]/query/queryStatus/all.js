import { resolved } from "./resolved";
import { unresolved } from "./unresolved";
import { withAuth } from "/utilities/withAuth";

export const allQueries = async (userType, uid) => {
    const resolvedQueries = await resolved(userType, uid);
    const unresolvedQueries = await unresolved(userType, uid);
    return {
        "resolved" : resolvedQueries, 
        "unresolved" : unresolvedQueries};
};

async function handler(req, res) {
    try{
        const {userType, uid} = req.query;
        return res.status(200).json(await allQueries(userType, uid));
    }
    catch(error){
        console.error("Error in getting all queries ", error);
        return res.status(500).json({ error: "Error in getting all queries" });
    }
    
}

export default withAuth(handler);