import { firebase } from "/firebase/firebaseConfig";

export const createUser = async (userType, uid, userDetails) => {
  const userRef = await firebase.firestore().collection(userType);
  userRef.doc(uid).set(userDetails);
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }
    
    try{
        const {userType, uid} = req.query;
        const userDetails = req.body;
        await createUser(userType, uid, userDetails)
        return res.status(200).json({ message: "Successfully created user" });
    }
    catch(error){
        console.error("Error in createUser ", error);
        return res.status(500).json({ error: "Error in createUser" });
    }
}
