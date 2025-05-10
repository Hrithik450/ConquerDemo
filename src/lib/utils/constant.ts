import {
  AppleDifferenceCardsProps,
  AppleExperienceCardsProps,
  HelpCardsProps,
  HeroProductImagesProps,
  LatestCardsProps,
  NavItem,
  PersonalizationProductsProps,
  ProductCardsProps,
  SampleResultProps,
} from "./constant.types";

export const navItems: NavItem[] = [
  {
    name: "Store",
    path: "/store",
    subItems: [
      {
        name: "Shop iPhone",
        path: "/store/iphone",
        subItems: [{ name: "Shop Mac", path: "/store/mac" }],
      },
      { name: "Shop Mac", path: "/store/mac" },
      { name: "Shop iPad", path: "/store/ipad" },
      { name: "Shop Watch", path: "/store/watch" },
    ],
  },
  {
    name: "Mac",
    path: "/mac",
    subItems: [
      { name: "MacBook Air", path: "/mac/macbook-air" },
      { name: "MacBook Pro", path: "/mac/macbook-pro" },
      { name: "iMac", path: "/mac/imac" },
      { name: "Mac Studio", path: "/mac/studio" },
    ],
  },
  {
    name: "iPad",
    path: "/ipad",
    subItems: [
      { name: "iPad Pro", path: "/ipad/pro" },
      { name: "iPad Air", path: "/ipad/air" },
      { name: "iPad Mini", path: "/ipad/mini" },
      { name: "Accessories", path: "/ipad/accessories" },
    ],
  },
  {
    name: "iPhone",
    path: "/iphone",
    subItems: [
      { name: "iPhone 15", path: "/iphone/15" },
      { name: "iPhone 14", path: "/iphone/14" },
      { name: "iPhone SE", path: "/iphone/se" },
      { name: "Compare Models", path: "/iphone/compare" },
    ],
  },
  {
    name: "Watch",
    path: "/watch",
    subItems: [
      { name: "Apple Watch Series 9", path: "/watch/series-9" },
      { name: "Apple Watch SE", path: "/watch/se" },
      { name: "Apple Watch Ultra", path: "/watch/ultra" },
      { name: "Bands", path: "/watch/bands" },
    ],
  },
  {
    name: "AirPods",
    path: "/airpods",
    subItems: [
      { name: "AirPods Pro", path: "/airpods/pro" },
      { name: "AirPods (3rd Gen)", path: "/airpods/3rd-gen" },
      { name: "AirPods Max", path: "/airpods/max" },
      { name: "Compare", path: "/airpods/compare" },
    ],
  },
  {
    name: "TV & Home",
    path: "/tv-home",
    subItems: [
      { name: "Apple TV 4K", path: "/tv-home/apple-tv" },
      { name: "HomePod", path: "/tv-home/homepod" },
      { name: "Home Accessories", path: "/tv-home/accessories" },
      { name: "AirPlay", path: "/tv-home/airplay" },
    ],
  },
  {
    name: "Entertainment",
    path: "/entertainment",
    subItems: [
      { name: "Apple Music", path: "/entertainment/music" },
      { name: "Apple TV+", path: "/entertainment/tv-plus" },
      { name: "Apple Arcade", path: "/entertainment/arcade" },
      { name: "Apple Books", path: "/entertainment/books" },
    ],
  },
  {
    name: "Accessories",
    path: "/accessories",
    subItems: [
      { name: "iPhone Cases", path: "/accessories/iphone" },
      { name: "Mac Accessories", path: "/accessories/mac" },
      { name: "iPad Accessories", path: "/accessories/ipad" },
      { name: "Watch Bands", path: "/accessories/watch" },
    ],
  },
  {
    name: "Support",
    path: "/support",
    subItems: [
      {
        name: "iPhone Support",
        path: "/support/iphone",
        subItems: [{ name: "Shop Mac", path: "/store/mac" }],
      },
      { name: "Mac Support", path: "/support/mac" },
      { name: "iPad Support", path: "/support/ipad" },
      { name: "Watch Support", path: "/support/watch" },
    ],
  },
];

export const sampleResults: SampleResultProps[] = [
  {
    title: "Welcome To CodeEaseX",
    description: "",
    source: "MERN-LAUNCHER",
  },
  {
    title: "Powered By CodeEaseX 🚀",
    description:
      "Setting up a full-stack project from scratch can be time-consuming...",
    source: "MERN-LAUNCHER",
  },
  {
    title: "Powered By CodeEaseX 🚀",
    description:
      "Every web developer knows this pain—you’re excited to build...",
    source: "MERN-LAUNCHER",
  },
];

export const heroProductImages: HeroProductImagesProps[] = [
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-mac-nav-202503?wid=400&hei=260&fmt=png-alpha&.v=1739502780055",
    name: "Mac",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-iphone-nav-202502?wid=400&hei=260&fmt=png-alpha&.v=1738706422726",
    name: "iPhone",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha&.v=1714168620875",
    name: "iPad",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-watch-nav-202409?wid=400&hei=260&fmt=png-alpha&.v=1724165625838",
    name: "Apple Watch",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-airpods-nav-202409?wid=400&hei=260&fmt=png-alpha&.v=1722974349822",
    name: "AirPods",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783380000",
    name: "AirTag",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha&.v=1664628458484",
    name: "Apple TV 4K",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-homepod-nav-202301?wid=400&hei=260&fmt=png-alpha&.v=1670389216654",
    name: "HomePod",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-accessories-nav-202503?wid=400&hei=260&fmt=png-alpha&.v=1739502322543",
    name: "Accessories",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha&.v=1664628458484",
    name: "Apple TV 4K",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783380000",
    name: "AirTag",
  },
];

export const latestCards: LatestCardsProps[] = [
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-iphone-16-pro-202409?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1726165763242",
    text: ["", "iPhone 16 Pro", " Apple Intelligence∆", "From ₹119900.00‡"],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem]",
    textOneStyle: "text-white",
    textTwoStyle:
      "font-SFmedium text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600] ",
    textThreeStyle: "text-white  text-sm font-SFregular",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-watch-s10-202409?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1724095131742",
    text: [
      "",
      "Apple Watch Series 10",
      "Thinstant classic.",
      "From ₹46900.00‡",
    ],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem]",
    textOneStyle: "text-black",
    textTwoStyle: "font-SFmedium text-xl text-black",
    textThreeStyle: "text-black  text-sm font-SFregular",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-ipad-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1740783181594",
    text: ["", "iPad Air", " Apple Intelligence∆", "From ₹59900.00‡"],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem]",
    textOneStyle: "text-black",
    textTwoStyle:
      "font-SFmedium text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600]",
    textThreeStyle: "text-black  text-sm font-SFregular",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-macbook-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1739502784018",
    text: ["", "MacBook Air", " Apple Intelligence∆", "From ₹99900.00‡"],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem] bg-cover",
    textOneStyle: "text-black",
    textTwoStyle:
      "font-SFmedium text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600]",
    textThreeStyle: "text-black  text-sm font-SFregular",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-iphone-16-pro-202409?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1726165763242",
    text: ["", "iPhone 16 Pro", " Apple Intelligence∆", "From ₹119900.00‡"],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem]",
    textOneStyle: "text-white",
    textTwoStyle:
      "font-SFmedium text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600]",
    textThreeStyle: "text-white  text-sm font-SFregular",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-watch-s10-202409?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1724095131742",
    text: [
      "",
      "Apple Watch Series 10",
      "Thinstant classic.",
      "From ₹46900.00‡",
    ],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem]",
    textOneStyle: "text-black",
    textTwoStyle: "font-SFmedium text-xl text-black",
    textThreeStyle: "text-black  text-sm font-SFregular",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-ipad-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1740783181594",
    text: ["", "iPad Air", " Apple Intelligence∆", "From ₹59900.00‡"],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem]",
    textOneStyle: "text-black",
    textTwoStyle:
      "font-SFmedium text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600]",
    textThreeStyle: "text-black  text-sm font-SFregular",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-40-macbook-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1739502784018",
    text: ["", "MacBook Air", " Apple Intelligence∆", "From ₹99900.00‡"],
    widthAndHeight:
      "max-sm:min-w-[21rem] min-w-[23rem] max-w-[25rem] h-[30rem] bg-cover",
    textOneStyle: "text-black",
    textTwoStyle:
      "font-SFmedium text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600]",
    textThreeStyle: "text-black  text-sm font-SFregular",
  },
];

export const productCards: ProductCardsProps[] = [
  {
    text: [
      "New colours",
      "Airpods Max - Orange",
      "MRP ₹59900.00 (Incl. of all taxes)",
    ],
    colorOptions: "flex justify-center space-x-3",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link2",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link3",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link4",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link5",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
    ],
  },
  {
    text: [
      "New",
      "iPhone 16 Plus Silicone Case with MagSafe - Peony",
      "MRP ₹4900.00 (Incl. of all taxes)",
    ],
    colorOptions: "flex justify-center space-x-3",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link2",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link3",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link4",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link5",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
    ],
  },
  {
    text: ["", "HomePod mini - White", "MRP ₹10900.00 (Incl. of all taxes)"],
    colorOptions: "flex justify-center space-x-3",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link2",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link3",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link4",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link5",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
    ],
  },
  {
    text: [
      "New colours",
      "Airpods Max - Orange",
      "MRP ₹59900.00 (Incl. of all taxes)",
    ],
    colorOptions: "flex justify-center space-x-3",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link2",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link3",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link4",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
      {
        label: "link5",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-max-select-202409-orange?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724927451265",
      },
    ],
  },
  {
    text: [
      "New",
      "iPhone 16 Plus Silicone Case with MagSafe - Peony",
      "MRP ₹4900.00 (Incl. of all taxes)",
    ],
    colorOptions: "flex justify-center space-x-3",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link2",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link3",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link4",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
      {
        label: "link5",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MDGR4?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1740164625404",
      },
    ],
  },
  {
    text: ["", "HomePod mini - White", "MRP ₹10900.00 (Incl. of all taxes)"],
    colorOptions: "flex justify-center space-x-3",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link2",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link3",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link4",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
      {
        label: "link5",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-mini-select-white-202110?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1632925509000",
      },
    ],
  },
];

export const personalizationProducts: PersonalizationProductsProps[] = [
  {
    text: [
      "Free Engraving",
      "AirPods 4 with Active Noise Cancellation",
      "MRP ₹17900.00 (Incl. of all taxes)",
    ],
    colorOptions: "hidden",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-4-anc-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1725502639798",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-4-anc-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1725502639798",
      },
    ],
  },
  {
    text: [
      "Free Engraving",
      "AirPods Pro 2",
      "MRP ₹24900.00 (Incl. of all taxes)",
    ],
    colorOptions: "hidden",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724041669458",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724041669458",
      },
    ],
  },
  {
    text: [
      "Free Engraving",
      "Apple Pencil Pro",
      "MRP ₹11900.00 (Incl. of all taxes)",
    ],
    colorOptions: "hidden",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX2D3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1713841707336",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX2D3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1713841707336",
      },
    ],
  },
  {
    text: [
      "Free Engraving",
      "AirPods 4 with Active Noise Cancellation",
      "MRP ₹17900.00 (Incl. of all taxes)",
    ],
    colorOptions: "hidden",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-4-anc-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1725502639798",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-4-anc-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1725502639798",
      },
    ],
  },
  {
    text: [
      "Free Engraving",
      "AirPods Pro 2",
      "MRP ₹24900.00 (Incl. of all taxes)",
    ],
    colorOptions: "hidden",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724041669458",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1724041669458",
      },
    ],
  },
  {
    text: [
      "Free Engraving",
      "Apple Pencil Pro",
      "MRP ₹11900.00 (Incl. of all taxes)",
    ],
    colorOptions: "hidden",
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX2D3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1713841707336",
    images: [
      {
        label: "link1",
        url: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX2D3?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1713841707336",
      },
    ],
  },
];

export const appleDifferenceCards: AppleDifferenceCardsProps[] = [
  {
    path: "M41.0009,12H5A5,5,0,0,0,.0009,17L0,39a5,5,0,0,0,4.9991,5H41.0009A5,5,0,0,0,46,39V17A5,5,0,0,0,41.0009,12ZM5,14H41.0009A3.0032,3.0032,0,0,1,44,17l.0005,2H2l.0005-2A3.0032,3.0032,0,0,1,5,14ZM41.0009,42H4.9991a3.0032,3.0032,0,0,1-3-3V22.9577H44V39A3.0032,3.0032,0,0,1,41.0009,42ZM15,31.5737v3.8526A1.5541,1.5541,0,0,1,13.4663,37H8.5338A1.5542,1.5542,0,0,1,7,35.4263V31.5737A1.5542,1.5542,0,0,1,8.5338,30h4.9325A1.5541,1.5541,0,0,1,15,31.5737Z",
    text: ["No Cost EMI.§ Plus Instant Cashback.§§"],
  },
  {
    path: "m47.8447 27.501-6.6758-7.1289c-.9111-.9619-1.9541-1.3721-3.4854-1.3721h-4.6836v-4c0-2.7614-2.2385-5-5-5h-22.9999c-2.7615 0-5 2.2386-5 5v21c0 2.7614 2.2385 5 5 5h1.1504c.2532 2.8719 2.6616 5.125 5.5996 5.125s5.3464-2.2531 5.5996-5.125h13.8008c.2532 2.8719 2.6616 5.125 5.5996 5.125s5.3464-2.2531 5.5996-5.125h2.6436c2.5469 0 4.0068-1.4092 4.0068-3.8657v-6.7515c0-1.0835-.4268-2.1396-1.1553-2.8818zm-32.5202 13.499c-.2463 1.7609-1.7468 3.125-3.5745 3.125s-3.3281-1.3641-3.5745-3.125c-.0232-.165-.0505-.3288-.0505-.5 0-.5364.1245-1.0415.3345-1.5.5725-1.2501 1.8281-2.125 3.2905-2.125s2.718.8749 3.2905 2.125c.21.4585.3345.9636.3345 1.5 0 .1712-.0273.335-.0505.5zm15.6755-2h-13.8335c-.6572-2.3773-2.8301-4.125-5.4165-4.125s-4.7593 1.7477-5.4165 4.125h-1.3335c-1.6543 0-3-1.3458-3-3v-21c0-1.6542 1.3457-3 3-3h23c1.6543 0 3 1.3458 3 3zm9.3245 2c-.2463 1.7609-1.7468 3.125-3.5745 3.125s-3.3281-1.3641-3.5745-3.125c-.0232-.165-.0505-.3288-.0505-.5 0-.5364.1245-1.0415.3345-1.5.5725-1.2501 1.8281-2.125 3.2905-2.125s2.718.8749 3.2905 2.125c.21.4585.3345.9636.3345 1.5 0 .1712-.0273.335-.0505.5zm6.6755-3.8657c0 1.3252-.5811 1.8657-2.0068 1.8657h-2.8267c-.6572-2.3773-2.8301-4.125-5.4165-4.125-1.4429 0-2.7544.5478-3.75 1.4407v-15.3157h4.6836c.9785 0 1.5107.1958 2.0303.7437l6.6875 7.1411c.375.3823.5986.9424.5986 1.498zm-3.3914-8.0216c.2444.2794.3914.493.3914.8873h-7.7773c-.75 0-1.2227-.4766-1.2227-1.2324v-5.7676h2.4131c.5703 0 .9944.23 1.3364.6244z",
    text: ["", "Enjoy free delivery, or easy pickup", "from an Apple Store."],
  },
  {
    path: "M19.5,45c0,.3524,.0723,.6857,.1843,1h-3.9343c-.5522,0-1-.4478-1-1s.4478-1,1-1h.25v-4H3c-1.6567,0-3-1.3431-3-3V13c0-1.6569,1.3433-3,3-3H40c1.6567,0,3,1.3431,3,3v13h-2V13.5c0-.8284-.6716-1.5-1.5-1.5H3.5c-.8284,0-1.5,.6716-1.5,1.5v18.5c0,.5522,.4478,1,1,1H23v9h-.5c-1.6543,0-3,1.3458-3,3Zm33,0c0,.5522-.4478,1-1,1H22.5c-.5522,0-1-.4478-1-1s.4478-1,1-1h2.5v-13c0-1.6569,1.3433-3,3-3h18c1.6567,0,3,1.3431,3,3v13h2.5c.5522,0,1,.4478,1,1Zm-5.5-14c0-.5514-.4485-1-1-1H28c-.5515,0-1,.4486-1,1v13h20v-13Z",
    text: [
      "",
      "Customise their Mac",
      " with ",
      "everything from graphics",
      "to",
      "storage.",
    ],
  },
  {
    path: "m34.781 18.3374a9.42 9.42 0 0 0 -6.4-5.9439 9.7754 9.7754 0 0 0 -2.7038-.39 9.3429 9.3429 0 0 0 -2.761.4206 8.4948 8.4948 0 0 0 -4.62 3.38c-.1515.22-.2268.3294-.3024.3294s-.1531-.1121-.3089-.3364a8.6021 8.6021 0 0 0 -5.9849-3.6871 9.1878 9.1878 0 0 0 -1.4175-.11 9.8736 9.8736 0 0 0 -3.195.5465 9.21 9.21 0 0 0 -4.429 3.1809 10.6217 10.6217 0 0 0 -2.1216 5.78 13.9554 13.9554 0 0 0 1.17 6.5777 24.3641 24.3641 0 0 0 4.5818 6.8573 41.9654 41.9654 0 0 0 5.9232 5.3526c1.5071 1.1256 3.0622 2.1884 4.6122 3.2558a2.0748 2.0748 0 0 0 1.1464.4492 1.2964 1.2964 0 0 0 .504-.104 4.2334 4.2334 0 0 0 .7711-.3887c1.3137-.9015 2.6387-1.7888 3.92-2.7348a43.72 43.72 0 0 0 7.12-6.4753 24.6053 24.6053 0 0 0 3.5926-5.2951 14.9016 14.9016 0 0 0 1.6209-6.4294 11.6632 11.6632 0 0 0 -.7181-4.2353zm-2.7 9.7855a22.5551 22.5551 0 0 1 -3.3068 4.8635 41.51 41.51 0 0 1 -6.7974 6.1773c-.9964.7358-2.0528 1.4573-3.0744 2.155l-.7888.54a1.014 1.014 0 0 1 -.1237.067l-.032-.0218-.3626-.25c-1.39-.9571-2.8284-1.9466-4.1872-2.9615a40.13 40.13 0 0 1 -5.6417-5.0973 22.1062 22.1062 0 0 1 -4.2189-6.2913 11.8911 11.8911 0 0 1 -1.0167-5.6446 8.5793 8.5793 0 0 1 1.7155-4.7161 7.1718 7.1718 0 0 1 3.4861-2.5031 7.909 7.909 0 0 1 2.55-.44 7.216 7.216 0 0 1 1.1095.0861 6.6148 6.6148 0 0 1 4.6572 2.8623c.2672.3847.83 1.5147 1.9508 1.5147 1.1255 0 1.6736-1.1336 1.9423-1.5233a6.4888 6.4888 0 0 1 3.5619-2.6045 7.3845 7.3845 0 0 1 2.1731-.3321 7.8194 7.8194 0 0 1 2.1525.3128 7.4522 7.4522 0 0 1 5.0916 4.7575 9.6774 9.6774 0 0 1 .5773 3.4753 12.8548 12.8548 0 0 1 -1.4173 5.5741z",
    text: [
      "Make it theirs.",
      " Engrave a mix of emoji, names and numbers for free.",
    ],
  },
  {
    path: "M41.0009,12H5A5,5,0,0,0,.0009,17L0,39a5,5,0,0,0,4.9991,5H41.0009A5,5,0,0,0,46,39V17A5,5,0,0,0,41.0009,12ZM5,14H41.0009A3.0032,3.0032,0,0,1,44,17l.0005,2H2l.0005-2A3.0032,3.0032,0,0,1,5,14ZM41.0009,42H4.9991a3.0032,3.0032,0,0,1-3-3V22.9577H44V39A3.0032,3.0032,0,0,1,41.0009,42ZM15,31.5737v3.8526A1.5541,1.5541,0,0,1,13.4663,37H8.5338A1.5542,1.5542,0,0,1,7,35.4263V31.5737A1.5542,1.5542,0,0,1,8.5338,30h4.9325A1.5541,1.5541,0,0,1,15,31.5737Z",
    text: ["No Cost EMI.§ Plus Instant Cashback.§§"],
  },
  {
    path: "m47.8447 27.501-6.6758-7.1289c-.9111-.9619-1.9541-1.3721-3.4854-1.3721h-4.6836v-4c0-2.7614-2.2385-5-5-5h-22.9999c-2.7615 0-5 2.2386-5 5v21c0 2.7614 2.2385 5 5 5h1.1504c.2532 2.8719 2.6616 5.125 5.5996 5.125s5.3464-2.2531 5.5996-5.125h13.8008c.2532 2.8719 2.6616 5.125 5.5996 5.125s5.3464-2.2531 5.5996-5.125h2.6436c2.5469 0 4.0068-1.4092 4.0068-3.8657v-6.7515c0-1.0835-.4268-2.1396-1.1553-2.8818zm-32.5202 13.499c-.2463 1.7609-1.7468 3.125-3.5745 3.125s-3.3281-1.3641-3.5745-3.125c-.0232-.165-.0505-.3288-.0505-.5 0-.5364.1245-1.0415.3345-1.5.5725-1.2501 1.8281-2.125 3.2905-2.125s2.718.8749 3.2905 2.125c.21.4585.3345.9636.3345 1.5 0 .1712-.0273.335-.0505.5zm15.6755-2h-13.8335c-.6572-2.3773-2.8301-4.125-5.4165-4.125s-4.7593 1.7477-5.4165 4.125h-1.3335c-1.6543 0-3-1.3458-3-3v-21c0-1.6542 1.3457-3 3-3h23c1.6543 0 3 1.3458 3 3zm9.3245 2c-.2463 1.7609-1.7468 3.125-3.5745 3.125s-3.3281-1.3641-3.5745-3.125c-.0232-.165-.0505-.3288-.0505-.5 0-.5364.1245-1.0415.3345-1.5.5725-1.2501 1.8281-2.125 3.2905-2.125s2.718.8749 3.2905 2.125c.21.4585.3345.9636.3345 1.5 0 .1712-.0273.335-.0505.5zm6.6755-3.8657c0 1.3252-.5811 1.8657-2.0068 1.8657h-2.8267c-.6572-2.3773-2.8301-4.125-5.4165-4.125-1.4429 0-2.7544.5478-3.75 1.4407v-15.3157h4.6836c.9785 0 1.5107.1958 2.0303.7437l6.6875 7.1411c.375.3823.5986.9424.5986 1.498zm-3.3914-8.0216c.2444.2794.3914.493.3914.8873h-7.7773c-.75 0-1.2227-.4766-1.2227-1.2324v-5.7676h2.4131c.5703 0 .9944.23 1.3364.6244z",
    text: ["", "Enjoy free delivery, or easy pickup", "from an Apple Store."],
  },
  {
    path: "M19.5,45c0,.3524,.0723,.6857,.1843,1h-3.9343c-.5522,0-1-.4478-1-1s.4478-1,1-1h.25v-4H3c-1.6567,0-3-1.3431-3-3V13c0-1.6569,1.3433-3,3-3H40c1.6567,0,3,1.3431,3,3v13h-2V13.5c0-.8284-.6716-1.5-1.5-1.5H3.5c-.8284,0-1.5,.6716-1.5,1.5v18.5c0,.5522,.4478,1,1,1H23v9h-.5c-1.6543,0-3,1.3458-3,3Zm33,0c0,.5522-.4478,1-1,1H22.5c-.5522,0-1-.4478-1-1s.4478-1,1-1h2.5v-13c0-1.6569,1.3433-3,3-3h18c1.6567,0,3,1.3431,3,3v13h2.5c.5522,0,1,.4478,1,1Zm-5.5-14c0-.5514-.4485-1-1-1H28c-.5515,0-1,.4486-1,1v13h20v-13Z",
    text: [
      "",
      "Customise their Mac",
      " with ",
      "everything from graphics",
      "to",
      "storage.",
    ],
  },
  {
    path: "m34.781 18.3374a9.42 9.42 0 0 0 -6.4-5.9439 9.7754 9.7754 0 0 0 -2.7038-.39 9.3429 9.3429 0 0 0 -2.761.4206 8.4948 8.4948 0 0 0 -4.62 3.38c-.1515.22-.2268.3294-.3024.3294s-.1531-.1121-.3089-.3364a8.6021 8.6021 0 0 0 -5.9849-3.6871 9.1878 9.1878 0 0 0 -1.4175-.11 9.8736 9.8736 0 0 0 -3.195.5465 9.21 9.21 0 0 0 -4.429 3.1809 10.6217 10.6217 0 0 0 -2.1216 5.78 13.9554 13.9554 0 0 0 1.17 6.5777 24.3641 24.3641 0 0 0 4.5818 6.8573 41.9654 41.9654 0 0 0 5.9232 5.3526c1.5071 1.1256 3.0622 2.1884 4.6122 3.2558a2.0748 2.0748 0 0 0 1.1464.4492 1.2964 1.2964 0 0 0 .504-.104 4.2334 4.2334 0 0 0 .7711-.3887c1.3137-.9015 2.6387-1.7888 3.92-2.7348a43.72 43.72 0 0 0 7.12-6.4753 24.6053 24.6053 0 0 0 3.5926-5.2951 14.9016 14.9016 0 0 0 1.6209-6.4294 11.6632 11.6632 0 0 0 -.7181-4.2353zm-2.7 9.7855a22.5551 22.5551 0 0 1 -3.3068 4.8635 41.51 41.51 0 0 1 -6.7974 6.1773c-.9964.7358-2.0528 1.4573-3.0744 2.155l-.7888.54a1.014 1.014 0 0 1 -.1237.067l-.032-.0218-.3626-.25c-1.39-.9571-2.8284-1.9466-4.1872-2.9615a40.13 40.13 0 0 1 -5.6417-5.0973 22.1062 22.1062 0 0 1 -4.2189-6.2913 11.8911 11.8911 0 0 1 -1.0167-5.6446 8.5793 8.5793 0 0 1 1.7155-4.7161 7.1718 7.1718 0 0 1 3.4861-2.5031 7.909 7.909 0 0 1 2.55-.44 7.216 7.216 0 0 1 1.1095.0861 6.6148 6.6148 0 0 1 4.6572 2.8623c.2672.3847.83 1.5147 1.9508 1.5147 1.1255 0 1.6736-1.1336 1.9423-1.5233a6.4888 6.4888 0 0 1 3.5619-2.6045 7.3845 7.3845 0 0 1 2.1731-.3321 7.8194 7.8194 0 0 1 2.1525.3128 7.4522 7.4522 0 0 1 5.0916 4.7575 9.6774 9.6774 0 0 1 .5773 3.4753 12.8548 12.8548 0 0 1 -1.4173 5.5741z",
    text: [
      "Make it theirs.",
      " Engrave a mix of emoji, names and numbers for free.",
    ],
  },
];

export const helpCards: HelpCardsProps[] = [
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-earth-day-specialist-help-202504?wid=4000&hei=4167&fmt=p-jpg&qlt=95&.v=1742855758114",
    text: [
      "APPLE SPECIALIST",
      "Shop one on one with a Specialist online.",
      "",
      "",
    ],
    widthAndHeight: "w-full h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-TAA-202310?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1697149577145",
    text: [
      "TODAY AT APPLE",
      "Join free sessions at your Apple Store.",
      "",
      "Learn about the latest features and how to go further with your Apple devices.",
    ],
    widthAndHeight: "w-full h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
    textThreeStyle: "text-[#1d1d1f] font-SFlight text-lg leading-tight",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-card-40-business-202409_GEO_IN?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=alV4a1Q5dWpXakxENUdPdUc5bk5oL3AvbkFpTUJaVTl5YXRNYno3eGE5aXFFMHhFSDhqV0JNYUQxSWJ4aDVUMm1td3JHMmlHM0d0VzBMMGs5ZHR4WjNqb1RJQWJGSnhVM2c1V3gzR1hhMHFHUTVhN1k1UDMwUiszWWU3d2JvUTc",
    text: [
      "BUSINESS",
      "From enterprise to small business, we’ll work with you.",
      "",
      "",
    ],
    widthAndHeight: "w-full h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-white",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-earth-day-specialist-help-202504?wid=4000&hei=4167&fmt=p-jpg&qlt=95&.v=1742855758114",
    text: [
      "APPLE SPECIALIST",
      "Shop one on one with a Specialist online.",
      "",
      "",
    ],
    widthAndHeight: "w-full h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-TAA-202310?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1697149577145",
    text: [
      "TODAY AT APPLE",
      "Join free sessions at your Apple Store.",
      "",
      "Learn about the latest features and how to go further with your Apple devices.",
    ],
    widthAndHeight: "w-full h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
    textThreeStyle: "text-[#1d1d1f] font-SFlight text-lg leading-tight",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-card-40-business-202409_GEO_IN?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=alV4a1Q5dWpXakxENUdPdUc5bk5oL3AvbkFpTUJaVTl5YXRNYno3eGE5aXFFMHhFSDhqV0JNYUQxSWJ4aDVUMm1td3JHMmlHM0d0VzBMMGs5ZHR4WjNqb1RJQWJGSnhVM2c1V3gzR1hhMHFHUTVhN1k1UDMwUiszWWU3d2JvUTc",
    text: [
      "BUSINESS",
      "From enterprise to small business, we’ll work with you.",
      "",
      "",
    ],
    widthAndHeight: "w-full h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-white",
  },
];

export const appleExperienceCards: AppleExperienceCardsProps[] = [
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-apple-intelligence-202503_GEO_IN?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1740119353535",
    text: [
      "",
      "Apple Intelligence",
      "Write, express yourself and get things done effortlessly.",
      "",
    ],
    widthAndHeight:
      "max-sm:min-w-[22rem] max-sm:bg-cover bg-center min-w-[28rem] max-w-[28rem] h-[29.2rem]",
    textOneStyle:
      "bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600] -mt-7 ",
    textTwoStyle: "text-[#6e6e73]",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-tv-services-202501?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1733945929334",
    text: [
      "APPLE TV+",
      "Get 3 months of Apple TV+ free when you buy an Apple device.",
      "",
      "",
    ],
    widthAndHeight:
      "max-sm:min-w-[22rem] max-sm:bg-cover bg-center min-w-[28rem] max-w-[28rem] h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
    textThreeStyle: "text-[#1d1d1f] font-SFlight text-lg leading-tight",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-subscriptions-202108?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1626375547000",
    text: ["  ", "Four Apple services. One easy subscription. ", "", ""],
    widthAndHeight:
      "max-sm:min-w-[22rem] max-sm:bg-cover bg-center min-w-[28rem] max-w-[28rem] h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
    textThreeStyle: "text-[#1d1d1f] font-SFlight text-lg leading-tight",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-apple-intelligence-202503_GEO_IN?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1740119353535",
    text: [
      "",
      "Apple Intelligence",
      "Write, express yourself and get things done effortlessly.",
      "",
    ],
    widthAndHeight:
      "max-sm:min-w-[22rem] max-sm:bg-cover bg-center min-w-[28rem] max-w-[28rem] h-[29.2rem]",
    textOneStyle:
      "bg-clip-text text-transparent bg-gradient-to-r from-[#0090f7] via-[#ba62fc] via-[#f2416b] to-[#f55600] -mt-7 ",
    textTwoStyle: "text-[#6e6e73] ",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-tv-services-202501?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1733945929334",
    text: [
      "APPLE TV+",
      "Get 3 months of Apple TV+ free when you buy an Apple device.",
      "",
      "",
    ],
    widthAndHeight:
      "max-sm:min-w-[22rem] max-sm:bg-cover bg-center min-w-[28rem] max-w-[28rem] h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
    textThreeStyle: "text-[#1d1d1f] font-SFlight text-lg leading-tight",
  },
  {
    link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-50-subscriptions-202108?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1626375547000",
    text: ["  ", "Four Apple services. One easy subscription. ", "", ""],
    widthAndHeight:
      "max-sm:min-w-[22rem] max-sm:bg-cover bg-center min-w-[28rem] max-w-[28rem] h-[29.2rem]",
    textZeroStyle: "text-[#6e6e73] -mt-7",
    textOneStyle: "text-black",
    textThreeStyle: "text-[#1d1d1f] font-SFlight text-lg leading-tight",
  },
];
