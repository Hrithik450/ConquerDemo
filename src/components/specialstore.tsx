import React from "react";
import Headings from "./headings";
import WideCard from "./wideCard";

const SpecialStore = () => {
  return (
    <section className="bg-[#F5F5F7] py-6">
      <div className="mx-auto max-sm:mx-5 max-lg:mx-10 lg:max-w-5/6">
        <Headings
          text={[
            "Special stores.",
            " Exclusive savings for students and educators.",
          ]}
          textColor={"text-[#1d1d1f]"}
        />
      </div>
      <div className=" mt-5 py-1 pb-10 max-w-screen pr-5 lg:pl-28 xl:pl-36 max-sm:px-5 max-lg:px-10 max-md:overflow-x-scroll no-scrollbar">
        <WideCard
          text={["EDUCATION", "Buy a new Mac or iPad with education savings."]}
          textZeroStyle={"-mt-7"}
          textOneStyle={"text-black"}
          widthAndHeight={
            "min-w-[23rem] max-sm:min-w-[21rem] max-w-[25rem] h-[31rem]"
          }
          link={
            "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-bts-edu-macbook-air-ipad-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1739502784046"
          }
        />
      </div>
    </section>
  );
};

export default SpecialStore;
