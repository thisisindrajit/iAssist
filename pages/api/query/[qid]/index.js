import { withAuth } from "../../../../utilities/withAuth";
import { firebase } from "/firebase/firebaseConfig";
import { getUpdates } from "./updates/getUpdates";

export const getQuery = async (qid) => {
    const snapshot = await firebase.firestore()
                        .collection("query")
                        .doc(qid).get();
    const updatesDetails = await getUpdates(qid);
    if(snapshot.exists)
        return {
            ...snapshot.data(),
            "updates" : updatesDetails
        }
    else
        return null;
};

async function handler(req, res) {
    try{
        const {qid} = req.query;
        const query = await getQuery(qid);
        if(query)
            return res.status(200).json(query);
        else
            return res.status(404).json({message : "User doesn't exist"});
    }
    catch(error){
        console.error("Error in getting query", error);
        return res.status(500).json({ error: "Error in getting query" });
    }
    
}

export default withAuth(handler);