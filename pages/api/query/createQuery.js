import { firebase } from "/firebase/firebaseConfig";

export const createQuery = async (queryDetails) => {
    const queryRef = await firebase.firestore().collection("query");
    await queryRef.add(queryDetails);
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }
    
    try{
        const queryDetails = req.body;
        await createQuery(queryDetails)
        return res.status(200).json({ message: "Successfully created Query" });
    }
    catch(error){
        console.error("Error in createQuery ", error);
        return res.status(500).json({ error: "Error in query createQuery" });
    }
}