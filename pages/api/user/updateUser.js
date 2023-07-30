import { getAuth, updateProfile } from "firebase/auth";
import { firebase_app } from "@/config/config";

import { updateDoc, doc, getFirestore } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const db = getFirestore(firebase_app);
    const user = req.body;
    const auth = getAuth();
    if (user.name !== auth.currentUser.displayName) {
      await updateProfile(auth.currentUser, {
        displayName: user.name,
      });

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        name: user.name,
      });
    }

    res
      .status(201)
      .json({ type: "success", message: "profile update successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ type: "error", message: "error in updating profile" });
  }
}
