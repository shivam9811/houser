import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firebase_app } from "../../../config/config";
import { setDoc, doc, serverTimestamp, getFirestore } from "firebase/firestore";

async function handler(req, res) {
  const user = req.body;
  const db = getFirestore(firebase_app);

  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const u = userCredential.user;

    updateProfile(auth.currentUser, {
      displayName: user.name,
    });

    const userCopy = { ...user };
    delete userCopy.password;
    delete userCopy.cpassword;
    userCopy.timestamp = serverTimestamp();

    await setDoc(doc(db, "users", u.uid), userCopy);
    res
      .status(201)
      .json({ type: "success", message: "registered successfully" });
  } catch (error) {
    res.json({ type: "error", message: "registration failed" });
  }
}

export default handler;
