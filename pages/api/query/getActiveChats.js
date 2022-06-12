import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "/utilities/withAuth";

export const getActiveChats = async () => {
    const snapshot = await firebase.firestore()
                        .collection("query")
                        .where("ticket_status", "==", "not_created").get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

async function handler(req, res) {
    try{
        return res.status(200).json(await getActiveChats());
    }
    catch(error){
        console.error("Error in getting active chats", error);
        return res.status(500).json({ error: "Error in getting active chats" });
    }    
}

export default withAuth(handler);