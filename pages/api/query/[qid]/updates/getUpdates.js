import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "../../../../../utilities/withAuth";

export const getUpdates = async (qid) => {
    const snapshot = await firebase.firestore()
                        .collection("query")
                        .doc(qid)
                        .collection("updates").orderBy("update_time").get();
    
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

async function handler(req, res) {
    try{
        const {qid} = req.query;
        return res.status(200).json(await getUpdates(qid));
    }
    catch(error){
        console.error("Error in getUpdates", error);
        return res.status(500).json({ error: "Error in getUpdates" });
    }
}

export default withAuth(handler);