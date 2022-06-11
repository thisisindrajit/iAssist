import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "../../../../utilities/withAuth";

export const getUser = async (userType, uid) => {
  const snapshot = await firebase
    .firestore()
    .collection(userType)
    .doc(uid)
    .get();
  if (snapshot.exists) return snapshot.data();
  else return null;
};

async function handler(req, res) {
  try {
    const { userType, uid } = req.query;
    const user = await getUser(userType, uid);
    if (user) return res.status(200).json(user);
    else return res.status(404).json({ message: "User doesn't exist" });
  } catch (error) {
    console.error("Error in getUser ", error);
    return res.status(500).json({ error: "Error in getUser" });
  }
}

export default withAuth(handler);