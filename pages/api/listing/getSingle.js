import { getDoc, doc, getFirestore } from "firebase/firestore";

import { firebase_app } from "../../../config/config";

export default async function helper(req, res) {
  const listingId = req.body;
  try {
    let listing = {};
    const db = getFirestore(firebase_app);
    const docRef = doc(db, "listings", listingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      listing = docSnap.data();

      res.json({ listing: listing, type: "success" });
    }
  } catch (error) {
    res.json({
      type: "error",
      message: "error in fetching listings",
    });
  }
}
