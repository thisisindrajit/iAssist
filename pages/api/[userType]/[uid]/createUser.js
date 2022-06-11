import { firebase } from "/firebase/firebaseConfig";

export const createUser = async (userType, uid, userDetails) => {
  const userRef = await firebase.firestore().collection(userType);
  userRef.doc(uid).set(userDetails);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const { userType, uid } = req.query;
    const userDetails = req.body;
    return res.status(200).json(await createUser(userType, uid, userDetails));
  } catch (error) {
    console.error("Error in query createUser ", error);
    return null;
  }
}
