import { firebase } from "/firebase/firebaseConfig";
import { withAuth } from "../../../utilities/withAuth";

export const createQuery = async (queryDetails) => {
  const queryRef = await firebase.firestore().collection("query");
  const newQuery = await queryRef.add(queryDetails);

  const nqDetails = await newQuery.get();

  return {
    queryId: nqDetails.id,
  };
};

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const queryDetails = req.body;
    queryDetails.asked_on = firebase.firestore.Timestamp.now();

    const newQueryDetails = await createQuery(queryDetails);
    return res.status(200).json(newQueryDetails);
  } catch (error) {
    console.error("Error in createQuery ", error);
    return res.status(500).json({ error: "Error in query createQuery" });
  }
}

export default withAuth(handler);
