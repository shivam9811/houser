import axios from "axios";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { firebase_app } from "@/config/config";

export default async function helper(req, res) {
  if (req.method === "POST") {
    try {
      const data = {
        ...req.body,
        timeStamp: serverTimestamp(),
      };
      delete data.images;
      delete data.latitude;
      delete data.longitude;

      !data.offer && delete data.discountedPrice;

      const db = getFirestore(firebase_app);

      const docRef = await addDoc(collection(db, "listings"), data);

      return res.json({ type: "success", message: "Listing add successfully" });
    } catch (error) {
      console.log(error);
      return res.json({ type: "error", message: "error in creating listing" });
    }
  }
}
