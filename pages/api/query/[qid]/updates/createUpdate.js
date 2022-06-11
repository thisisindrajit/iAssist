import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "../../../../../utilities/withAuth";

export const createUpdate = async (qid, updateDetails) => {
    const updateRef = await firebase.firestore()
                            .collection("query")
                            .doc(qid)
                            .collection("updates");
    updateRef.add(updateDetails);
};

async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }
    
    try{
        const {qid} = req.query;
        const updateDetails = req.body;
        await createUpdate(qid, updateDetails)
        return res.status(200).json({ message: "Successfully created update" });
    }
    catch(error){
        console.error("Error in createUpdate ", error);
        return res.status(500).json({ error: "Error in createUpdate" });
    }
}

export default withAuth(handler);