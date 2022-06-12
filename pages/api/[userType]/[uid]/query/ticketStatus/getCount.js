import { withAuth } from "/utilities/withAuth";
import { completed } from "./completed";
import { inProgress } from "./inProgress";
import { pending } from "./pending";

export const getCount = async (userType, uid) => {
    const pendingQueries = await pending(userType, uid);
    const inProgressQueries = await inProgress(userType, uid);
    const completedQueries = await completed(userType, uid);
    return {
        "pending" : pendingQueries.length, 
        "in-progress" : inProgressQueries.length,
        "completed": completedQueries.length};
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