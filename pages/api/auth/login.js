import { firebase_app } from "../../../config/config";
import jwt from "jsonwebtoken";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const user = req.body;

  try {
    const auth = getAuth(firebase_app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (userCredential.user) {
      const tokenData = {
        id: userCredential.user.uid,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      const response = res.status(201).json({
        type: "success",
        message: "logged in successfull",
        token: token,
      });

      return response;
    }
  } catch (error) {
    console.log(error);
    res.json({ type: "error", message: "invalid Credentials" });
  }
}
