import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "../../../../utilities/withAuth";

export const updateUserField = async (userType, uid, updatedFieldValue) => {
    const userRef = firebase.firestore()
                        .collection(userType)
                        .doc(uid);
    await userRef.update(updatedFieldValue);
};

async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    try{
        const {userType, uid} = req.query;
        const updatedFieldValue = req.body;
        await updateUserField(userType, uid, updatedFieldValue)
        return res.status(200).json({ message: "Successfully updated User Field" });
    }
    catch(error){
        console.error("Error in updating user field", error);
        return res.status(500).json({ error: "Error in updating user field" });
    }
    
}

export default withAuth(handler);