import { firebase } from "/firebase/firebaseConfig";

export const createQuery = async (qid, updateDetails) => {
    const updateRef = await firebase.firestore()
                            .collection("query")
                            .doc(qid)
                            .collection("updates");
    updateRef.add(updateDetails);
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }
    
    try{
        const {qid} = req.query;
        const updateDetails = req.body;
        return res.status(200).json(await createQuery(qid, updateDetails));
    }
    catch(error){
        console.error("Error in createUser ", error);
        return res.status(500).json({ error: "Error in createUser" });
    }
}