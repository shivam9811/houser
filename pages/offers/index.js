import React, { useState } from "react";
import Meta from "@/components/Meta";
import { firebase_app } from "../../config/config";
import { toast } from "react-toastify";
import ListingItem from "@/components/ListingItem";
import Spinner from "@/components/Spinner";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getFirestore,
} from "firebase/firestore";

const Offers = (props) => {
  if (props.error != {}) {
    toast.error(props.error.message);
  }
  const listings = JSON.parse(props.listings);
  return (
    <>
      <Meta title="Offers" />
      <div className="pageContainer">
        <div className="category">
          <header>
            <p className="pageHeader">Offers</p>
          </header>
          {listings && listings.length > 0 ? (
            <>
              <main>
                <ul className="categoryListings">
                  {listings.map((listing) => (
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                    />
                  ))}
                </ul>
              </main>
            </>
          ) : (
            <p>There are no current Offers</p>
          )}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  let listings = [];
  let error = {};

  try {
    //create a reference
    const db = getFirestore(firebase_app);
    const listingsRef = collection(db, "listings");
    //create a query
    const q = query(
      listingsRef,
      where("offer", "==", true),
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
  } catch (error) {
    error = {
      message: "error in fetching listings",
    };
  }

  listings = JSON.stringify(listings);

  return {
    props: {
      listings: listings,
      error: error,
    },
  };
}

export default Offers;
