import { doc, getDoc } from "firebase/firestore";

import { firebase_app } from "@/config/config";
import { getFirestore } from "firebase/firestore";

import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = getFirestore(firebase_app);
      const token = req.cookies.userId;
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const id = decodedToken.id;
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);
      return res.json({ message: "success", userId: id, user: docSnap.data() });
    } catch (error) {
      return res.json({ error: error.message });
    }
  } else {
    try {
      const db = getFirestore(firebase_app);
      const id = req.body;
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);
      return res.json({ message: "success", userId: id, user: docSnap.data() });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}
