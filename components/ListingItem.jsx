import React from "react";
import Link from "next/link";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaToilet, FaBed } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";

const ListingItem = ({ listing, id, onDelete }) => {
  return (
    <li className="categoryListing">
      <Link href={`/listing/${id}`} className="categoryListingLink">
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            {listing.offer && (
              <del style={{ color: "red", marginRight: "4px" }}>
                &#8377;
                {listing.regularPrice
                  .toString()
                  .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
              </del>
            )}
            &#8377;
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")}
            {listing.type === "rent" && " /Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <FaBed />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedrooms"}
            </p>
            <GiBathtub />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathrooms"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <RiDeleteBin5Line
          className="removeIcon"
          fill="rgb(231,76,60)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
    </li>
  );
};

export default ListingItem;
