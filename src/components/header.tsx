import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-center py-4 bg-white max-sm:px-2 max-lg:px-11">
      <p className="text-center text-sm font-SFlight bg-white text-[#000]  tracking-wider py-1">
        Get up to 12 months of No Cost EMI
        <sup className="text-[0.5rem]">§</sup> plus up to ₹8000.00 instant
        cashback
        <sup className="text-[0.5rem]">§§</sup> on selected products with
        eligible cards.{" "}
        <a className="text-blue-800" href="#">
          See offers
        </a>
        <a className="inline-block align-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-[1.1rem] text-blue-700 px-1 box-content"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </a>
      </p>
    </div>
  );
};

export default Header;
