import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { firebase_app } from "@/config/config";

export default async function handler(req, res) {
  const auth = getAuth(firebase_app);
  try {
    await signOut(auth);
    res.status(201).json({ type: "success", message: "successfully logout" });
  } catch (error) {
    console.log(error);
  }
}
