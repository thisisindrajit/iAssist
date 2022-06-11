import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "../../../../../utilities/withAuth";

export const resolved = async (userType, uid) => {
    const queryUserRef = firebase.firestore()
                        .collection("query")
                        .where(userType+"_id", "==", uid);
    
    const snapshot = await queryUserRef.where("query_status", "==", "resolved").get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

async function handler(req, res) {
    try{
        const {userType, uid} = req.query;
        return res.status(200).json(await resolved(userType, uid));
    }
    catch(error){
        console.error("Error in getting resolved queries", error);
        return res.status(500).json({ error: "Error in getting resolved queries" });
    }    
}

export default withAuth(handler);