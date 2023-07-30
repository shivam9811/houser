import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebase_app } from "@/config/config";

export default async function handler(req, res) {
  try {
    const email = req.body;
    console.log(email);
    const auth = getAuth(firebase_app);
    await sendPasswordResetEmail(auth, email);

    res
      .status(201)
      .json({ type: "success", message: "Reset Link was sent !!!" });
  } catch (error) {
    res
      .status(400)
      .json({ type: "error", message: "problem in sending reset link" });
  }
}
