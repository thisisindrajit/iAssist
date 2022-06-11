import { firebase } from "/firebase/firebaseConfig";

export const getUser = async (userType, uid) => {
  const snapshot = await firebase
    .firestore()
    .collection(userType)
    .doc(uid)
    .get();
  if (snapshot.exists) return snapshot.data();
  else return null;
};

export default async function handler(req, res) {
  try {
    const { userType, uid } = req.query;
    return res.status(200).json(await getUser(userType, uid));
  } catch (error) {
    console.error("Error in query getUser", error);
    return null;
  }
}
