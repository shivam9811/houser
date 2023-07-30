import Meta from "@/components/Meta";
import { useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import ListingForm from "@/components/ListingForm";
import { toast } from "react-toastify";
import axios from "axios";
import { firebase_app } from "@/config/config";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const CreateListing = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const [userData, setUserData] = useState({ name: "", email: "", uid: "" });
  const [loading, setLoading] = useState(false);
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  useEffect(() => {
    const getCall = async () => {
      const res = await fetch("/api/user/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserData((prev) => ({
        ...prev,
        name: data.user.name,
        email: data.user.email,
        uid: data.userId,
      }));
    };

    getCall();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const onMutate = (e) => {
    let a = null;
    if (e.target.value === "true") {
      a = true;
    }
    if (e.target.value === "false") {
      a = false;
    }
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: a ?? e.target.value, //if a is null then use e.target.value
      }));
    }
  };

  const onSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price should be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images are allowed");
      return;
    }

    const resp = await axios.get(
      "https://www.mapquestapi.com/geocoding/v1/address",
      {
        params: {
          key: "4RTPHICrSAKskW5fMS1kLDRfj3nYCTYQ",
          location: address,
        },
      }
    );

    const { lat, lng } = resp.data.results[0].locations[0].latLng;
    const messaage = resp.data.results[0].locations[0].source;

    let geolocation;
    if (messaage === undefined) {
      geolocation = { lat, lng };
    } else {
      setLoading(false);
      toast.error("Invalid address");
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        console.log(storage);

        const fileName = `${userData.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      console.log(error);
      setLoading(false);
      toast.error("Problem in uploading images");
      return;
    });

    console.log(imageUrls);

    const formDataCopy = {
      ...formData,
      imageUrls,
      geolocation,
      userRef: userData.uid,
    };

    console.log(formDataCopy);

    const res = await fetch("/api/listing/create", {
      method: "POST",
      body: JSON.stringify(formDataCopy),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    toast[data.type](data.messaage);

    setLoading(false);
    router.push("/");
  };

  return (
    <>
      <Meta title="Create Listing"></Meta>

      {userData.name === "" ? (
        <div className="pageContainer">
          <h1>
            Please login first or create a new account to contine to add a new
            listing
          </h1>

          <Link style={{ color: "blue" }} href="/login">
            Login
          </Link>
          <Link style={{ color: "blue" }} href="/signup">
            Register
          </Link>
        </div>
      ) : (
        <div className="pageContainer">
          <div className="profile">
            <header className="pageHeader">Create a Listing</header>
            <main>
              <ListingForm
                type={type}
                name={name}
                bedrooms={bedrooms}
                bathrooms={bathrooms}
                parking={parking}
                furnished={furnished}
                address={address}
                offer={offer}
                regularPrice={regularPrice}
                discountedPrice={discountedPrice}
                images={images}
                latitude={latitude}
                longitude={longitude}
                onMutate={onMutate}
                onSubmit={onSubmit}
              />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateListing;
