import React, { useState } from "react";
import Meta from "@/components/Meta";
import { toast } from "react-toastify";
import ListingItem from "@/components/ListingItem";
import { useEffect } from "react";

const Category = (props) => {
  const [listings, setListings] = useState(null);
  useEffect(() => {
    const getCall = async () => {
      const res = await fetch("/api/listing/get", {
        method: "POST",
        body: JSON.stringify(props.categoryType),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setListings(data.listings);
    };
    getCall();
  }, [props.categoryType]);

  return (
    <>
      <Meta title={props.categoryType}></Meta>
      <div className="pageContainer">
        <div className="category">
          <header>
            <p className="pageHeader">
              {props.categoryType === "rent"
                ? "Places for rent"
                : "Places for sale"}
            </p>
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
            <p>No Listings for {props.categoryType}</p>
          )}
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: ["/sale", "/rent"],
  };
}

export async function getStaticProps(context) {
  const categoryType = context.params.categoryType;

  return {
    props: {
      categoryType: categoryType,
    },
  };
}

export default Category;
