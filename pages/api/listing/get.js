import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import { firebase_app } from "../../../config/config";

export default async function helper(req, res) {
  const categoryType = req.body;

  try {
    //create a reference
    let listings = [];

    const db = getFirestore(firebase_app);
    const listingsRef = collection(db, "listings");
    // const docRef = doc(db, "listings", "eac7e644-e028-4656-9611-718e7e7194b8");
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    //create a query
    const q = query(
      listingsRef,
      where("type", "==", categoryType),
      // orderBy("timestamp", "desc"),
      limit(10)
    );

    // execute the query
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    res.json({ listings: listings });
  } catch (error) {
    res.json({
      message: "error in fetching listings",
    });
  }

  //   listings = JSON.stringify(listings);
}
