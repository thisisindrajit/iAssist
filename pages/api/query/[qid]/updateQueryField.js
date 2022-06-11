import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "../../../../utilities/withAuth";

export const updateQueryField = async (qid, updatedFieldValue) => {
    const queryRef = firebase.firestore()
                        .collection("query")
                        .doc(qid);
    await queryRef.update(updatedFieldValue);
};

async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    try{
        const {qid} = req.query;
        const updatedFieldValue = req.body;
        await updateQueryField(qid, updatedFieldValue)
        return res.status(200).json({ message: "Successfully updated Query Field" });
    }
    catch(error){
        console.error("Error in updating query", error);
        return res.status(500).json({ error: "Error in updating query" });
    }
    
}

export default withAuth(handler);