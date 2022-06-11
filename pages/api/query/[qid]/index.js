import { firebase } from "/firebase/firebaseConfig";

export const getQuery = async (qid) => {
    const snapshot = await firebase.firestore()
                        .collection("query")
                        .doc(qid).get();
    if(snapshot.exists)
        return snapshot.data();
    else
        return null;
};

export default async function handler(req, res) {
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