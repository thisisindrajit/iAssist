import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "/utilities/withAuth";

export const pending = async (userType, uid) => {
    const queryUserRef = firebase.firestore()
                        .collection("query")
                        .where(userType+"_id", "==", uid);
    
    const snapshot = await queryUserRef.where("ticket_status", "==", "pending").get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

async function handler(req, res) {
    try{
        const {userType, uid} = req.query;
        return res.status(200).json(await pending(userType, uid));
    }
    catch(error){
        console.error("Error in getting pending queries", error);
        return res.status(500).json({ error: "Error in getting pending queries" });
    }    
}

export default withAuth(handler);