import React, { useEffect, useState } from "react";
import Meta from "@/components/Meta";

function LandLordPage(props) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user/getUser", {
        method: "POST",
        body: JSON.stringify(props.landlordId),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.user) {
        setLandlord({
          name: data.user.name,
          email: data.user.email,
        });
      }
    };
    getUser();
  }, [props.landlordId]);

  const onChange = (e) => setMessage(e.target.value);
  return (
    <>
      <Meta title="contact"></Meta>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Contact Landlord</p>
        </header>
        {landlord !== null && (
          <main>
            <div className="contactLandlord">
              <p className="landlordName">Contact:{landlord.name}</p>
            </div>
            <form className="messageForm">
              <div className="messageDiv">
                <label htmlFor="message" className="messageLabel">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="textarea"
                  value={message}
                  onChange={onChange}
                ></textarea>
              </div>
              <a href={`mailto:${landlord.email}?body=${message}`}>
                <button type="button" className="primaryButton">
                  Send Message
                </button>
              </a>
            </form>
          </main>
        )}
      </div>
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
  const landlordId = context.params.landlordId;

  return {
    props: {
      landlordId,
    },
  };
}

export default LandLordPage;
