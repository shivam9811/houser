import React, { useEffect, useState } from "react";
import Meta from "@/components/Meta";
import Head from "next/head";
import Script from "next/script";
import Spinner from "@/components/Spinner";
import { FaShareAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import cookie from "react-cookies";
import Link from "next/link";

import { GiHomeGarage, GiBathtub, GiRockingChair } from "react-icons/gi";

function SingleListing(props) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setSharedLinkCopied] = useState(null);

  useEffect(() => {
    const getListing = async () => {
      const res = await fetch("/api/listing/getSingle", {
        method: "POST",
        body: JSON.stringify(props.listingId),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      setListing(data.listing);

      setLoading(false);
    };
    getListing();
  }, [props.listingId]);
  return (
    <>
      <Meta title={props.listingId}></Meta>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        listing && (
          <div className="pageContainer">
            <main>
              <img src={listing.imageUrls[0]} style={{ width: "100%" }} />

              <div
                className="shareIconDiv"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setSharedLinkCopied(true);
                  setTimeout(() => {
                    setSharedLinkCopied(false);
                  }, 2000);
                }}
              >
                <FaShareAlt />
              </div>
              {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

              <div className="listingDetails">
                <p className="listingName">
                  {listing.name}- &#8377;
                  {listing.offer
                    ? listing.discountedPrice
                        .toString()
                        .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")
                    : listing.regularPrice
                        .toString()
                        .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
                </p>
                <p className="listingLocation">{listing.address}</p>
                <p className="listingType">
                  For {listing.type === "rent" ? "Rent" : "Sale"}
                </p>
                {listing.offer && (
                  <p className="discountPrice">
                    &#8377;
                    {(listing.regularPrice - listing.discountedPrice)
                      .toString()
                      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}{" "}
                    discount
                  </p>
                )}
                <ul className="listingDetailsList">
                  <li>
                    <FaBed style={{ marginRight: "0.5rem" }} />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} Bedrooms`
                      : "1 Bedroom"}
                  </li>
                  <li>
                    <GiBathtub style={{ marginRight: "0.5rem" }} />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} Bathrooms`
                      : "1 Bathroom"}
                  </li>
                  <li>
                    <GiHomeGarage style={{ marginRight: "0.5rem" }} />
                    {listing.parking ? "Parking Spot" : "No parking"}
                  </li>
                  <li>
                    <GiRockingChair style={{ marginRight: "0.5rem" }} />
                    {listing.furnished ? "Furnished" : "Not furnished"}
                  </li>
                </ul>

                {cookie.load("id") !== listing.userRef && (
                  <Link
                    href={`/contact/${listing.userRef}?listingName=${listing.name}`}
                    className="primaryButton"
                  >
                    Contact Landlord
                  </Link>
                )}
              </div>
            </main>
          </div>
        )
      )}
      ;
    </>
  );
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
  };
}

export function getStaticProps(context) {
  const listingId = context.params.listingId;

  return {
    props: {
      listingId,
    },
  };
}

export default SingleListing;
