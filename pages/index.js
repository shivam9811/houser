import Meta from "@/components/Meta";
import Link from "next/link";

const Explore = () => {
  return (
    <>
      <Meta title="houser" />
      <div className="pageContainer">
        <p className="pageHeader">Explore</p>
        <main>
          {/* slider */}
          <p className="exploreCategoryHeading">Categories</p>
          <div className="exploreCategories">
            <Link href="/rent">
              <img
                className="exploreCategoryImg"
                src="../assets/jpg/rent_house_73089751-5bfc333346e0fb002602ddbe.jpg"
                alt="rent"
              />
              <p className="exploreCategoryName">Places for rent</p>
            </Link>
            <Link href="/sale">
              <img
                className="exploreCategoryImg"
                src="../assets/jpg/Home_loan_1653990763.jpg"
                alt="sale"
              />
              <p className="exploreCategoryName">Places for sale</p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default Explore;
