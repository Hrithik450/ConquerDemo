import { FootLinkListProps } from "@/lib/utils/constant.types";
import React from "react";

const FootLinkList = ({ title, list }: FootLinkListProps) => {
  return (
    <ul className="space-y-2.5 mb-5">
      <li className="flex justify-between items-center text-xs font-SFmedium max-md:font-SFlight tracking-widest text-black">
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 text-gray-500 md:hidden"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </li>
      <hr className="md:hidden text-gray-300" />
      {list.map((item, index) => (
        <li
          key={index}
          className="text-xs font-SFlight text-[#000000b8] tracking-widest  max-md:hidden"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

const Footer = () => {
  return (
    <section className="bg-[#F5F5F7]">
      <div className="max-lg:mx-10 max-sm:mx-5 mx-auto lg:max-w-5/6 pb-10">
        <p className="text-xs text-[#6e6e73]">
          ∆ Apple Intelligence is available in beta on all iPhone 16 models,
          iPhone 15 Pro, iPhone 15 Pro Max, iPad mini (A17 Pro), and iPad and
          Mac models with M1 and later, with Siri and device language set to
          Chinese (Simplified), English (Australia, Canada, India, Ireland, New
          Zealand, Singapore, South Africa, UK or US), French, German, Italian,
          Japanese, Korean, Portuguese (Brazil) or Spanish, as part of an iOS
          18, iPadOS 18 and macOS Sequoia software update, with more languages
          coming over the course of the year, including Vietnamese. Some
          features may not be available in all regions or languages. <br />
          ◊◊ Monthly pricing is after purchase using EMI with qualifying cards
          at 15.99% p.a. over a 12‑month tenure. Monthly pricing is rounded to
          the nearest rupee. Exact pricing will be provided by your card issuer,
          subject to your card issuer’s terms and conditions. <br />
          Representative example: <br />
          A purchase of ₹79900.00 repaid over 12 months with an interest rate of
          15.99% p.a. requires monthly payments of ₹7249.00. Total amount
          payable: ₹86988.00. Total interest paid to bank: ₹7088.00. <br />
          § No Cost EMI is available with the purchase of an eligible product
          made using qualifying cards on 3-, 6-, 9-, or 12-month tenures from
          most leading card issuers. Eligible AirPods, HomePod and Beats
          products are available with No Cost EMI on 3- and 6-month tenures
          only. Monthly pricing is rounded to the nearest rupee. Exact pricing
          will be provided by your card issuer, subject to your card issuer’s
          terms and conditions. Minimum order spend applies as per your card
          issuer’s threshold. No Cost EMI is not available to Business customers
          and cannot be combined with Apple Store for Education or Corporate
          Employee Purchase Plan pricing. Card eligibility is subject to terms
          and conditions between you and your card issuer. Offer may be revised
          or withdrawn at any time without any prior notice. Terms apply. <br />
          Representative example: <br />
          A purchase of ₹79900.00 repaid over 12 months with an interest rate of
          15.99% p.a. and No Cost EMI savings of ₹6514.00 requires monthly
          payments of ₹6658.00. Total amount payable: ₹79900.00. <br />
          §§ Instant cashback is available with the purchase of an eligible
          product with qualifying American Express, Axis Bank and ICICI Bank
          cards only. Minimum transaction value of ₹10001.00 applies. Click here
          to see instant cashback amounts and eligible devices. Instant cashback
          is available for up to two orders per rolling 90-day period with an
          eligible card. Card eligibility is subject to terms and conditions
          between you and your card issuer. Total transaction value is
          calculated after any trade-in credit or eligible discount is applied.
          Any subsequent order adjustment(s) or cancellation(s) may result in
          instant cashback being recalculated, and any refund may be adjusted to
          account for instant cashback clawback; this may result in no refund
          being made to you. Offer may be revised or withdrawn at any time
          without any prior notice. Additional terms apply. Instant cashback is
          not available to Business customers and cannot be combined with Apple
          Store for Education or Corporate Employee Purchase Plan pricing.
          Multiple separate orders cannot be combined for instant cashback.{" "}
          <br />
          * Mac, iPad, and Apple Watch trade-in is available only in-store in
          India. Apple Retail Online in India does not offer trade-in for Mac,
          iPad, and Apple Watch. Trade‑in values will vary based on the
          condition, year and configuration of your eligible trade‑in device.
          Not all devices are eligible for credit. You must be at least the age
          of majority to be eligible to trade in for credit. Trade‑in value may
          be applied towards a qualifying new device purchase. Actual value
          awarded is based on receipt of a qualifying device matching the
          description provided when estimate was made. Sales tax may be assessed
          on full value of a new device purchase. In-store trade‑in requires
          presentation of a valid photo ID (local law may require saving this
          information). Some stores may have additional requirements. Apple or
          its trade‑in partners reserve the right to refuse, cancel or limit the
          quantity of any trade‑in transaction for any reason. More details are
          available from Apple’s trade‑in partner for trade‑in and recycling of
          eligible devices. Restrictions and limitations may apply. <br />
          ° Apple TV+ offer available to new and qualified returning subscribers
          only. ₹99/month after free trial. Only one offer per Apple Account and
          only one offer per family if you’re part of a Family Sharing group,
          regardless of the number of devices that you or your family purchase.
          This offer is not available if you or your family have previously
          accepted an Apple TV+ 3 months free or 1 year free offer. Offer valid
          for three months after eligible device is activated. Plan
          automatically renews until cancelled. Restrictions and other terms
          apply. <br />
          1. Special pricing available to qualified customers. To learn more
          about how to start qualifying for special pricing, talk to an Apple
          Specialist in a store or give us a call on 000800 040 1966. <br />
          ⁺ New subscribers only. ₹119.00/month after trial. Offer is available
          for new Apple Music subscribers with a new eligible device for a
          limited time only. Offer redemption for eligible audio devices
          requires connecting or pairing to an Apple device running the latest
          iOS or iPadOS. Offer redemption for Apple Watch requires connecting or
          pairing to an iPhone running the latest iOS. Offer good for three
          months after eligible device activation. Only one offer per Apple
          Account, regardless of the number of eligible devices you purchase.
          Plan automatically renews until cancelled. Restrictions and other
          terms(opens in new window) apply. <br />
          ** New and qualified returning subscribers only. ₹99/month after free
          trial. Only one offer per Apple Account and only one offer per family
          if you’re part of a Family Sharing group, regardless of the number of
          devices you or your family purchases. This offer is not available if
          you or your Family have previously accepted an Apple Arcade
          3-month-free offer. Offer is valid for 3 months after eligible device
          activation. Plan automatically renews until cancelled. Restrictions
          and other terms apply. <br />‡ Listed pricing is Maximum Retail Price
          (inclusive of all taxes). <br />
          We use your location to show you delivery options faster. We found
          your location using your IP address or because you entered it during a
          previous visit to Apple.
        </p>
        <hr className="text-gray-300 my-4" />
        <div className="flex items-center space-x-3">
          <svg
            height="44"
            viewBox="0 0 14 44"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="text-[#000c]"
          >
            <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 text-[#6e6e73]"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-SFlight text-xs text-[#000000b8] tracking-widest">
            Apple Store Online
          </p>
        </div>
        <div className="flex max-md:flex-col justify-between my-5 max-md:flex-wrap">
          <div>
            <FootLinkList
              title={"Shop and Learn"}
              list={[
                "Store",
                "Mac",
                "iPad",
                "iPhone",
                "Watch",
                "AirPods",
                "TV & Home",
                "AirTag",
                "Accessories",
                "Gift Cards",
              ]}
            />
            <FootLinkList title={"Apple Wallet"} list={["Wallet"]} />
          </div>
          <div>
            <FootLinkList
              title={"Account"}
              list={[
                "Manage Your Apple Account",
                "Apple Store Account",
                "iCloud.co",
              ]}
            />
            <FootLinkList
              title={"Entertainment"}
              list={[
                "Apple One",
                "Apple TV+",
                "Apple Music",
                "Apple Arcade",
                "Apple Podcasts",
                "Apple Books",
                "App Store",
              ]}
            />
          </div>
          <div>
            <FootLinkList
              title={"Apple Store"}
              list={[
                "Find a Store",
                "Genius Bar",
                "Today at Apple",
                "Apple Summer Camp",
                "Ways to Buy",
                "Apple Trade In",
                "Recycling Programme",
                "Find your Order - Apple",
                "Shopping Help",
              ]}
            />
          </div>
          <div>
            <FootLinkList
              title={"For Business"}
              list={["Apple and Business"]}
            />
            <FootLinkList
              title={"For Education"}
              list={[
                "Apple and Education",
                "Shop for Education",
                "Shop for University",
              ]}
            />
            <FootLinkList
              title={"For Healthcare"}
              list={["Apple in Healthcare", "Health on Apple Watch"]}
            />
          </div>
          <div>
            <FootLinkList
              title={"Apple Values"}
              list={[
                "Accessibility",
                "Environment",
                "Privacy",
                "Supply Chai",
                "",
              ]}
            />
            <FootLinkList
              title={"About Apple"}
              list={[
                "Newsroom",
                "Apple Leadership",
                "Career Opportunities",
                "Investors",
                "Ethics & Compliance",
                "Events",
                "Contact Apple",
              ]}
            />
          </div>
        </div>
        <p className="text-xs font-SFlight text-[#6e6e73] tracking-wider">
          More ways to shop:{" "}
          <a href="#" className="text-blue-600 underline">
            Find an Apple Store
          </a>{" "}
          or{" "}
          <a href="#" className="text-blue-600 underline">
            other retailer
          </a>
          near you. Or call 000800 040 1966.
        </p>
        <hr className="text-gray-300 my-5 max-md:hidden" />
        <div className="flex justify-between max-md:flex-wrap">
          <div className="flex max-md:flex-wrap">
            <p className="text-[0.8rem] font-SFlight text-[#6e6e73] tracking-wider">
              Copyright © 2025 Apple Inc. All rights reserved.
            </p>
            <p className="text-[0.8rem] font-SFlight text-[#1d1d1f] tracking-wider ml-5 max-md:ml-0">
              Privacy | Policy | Terms | of | Use | Sales | Policy | Legal |
              Site | Map
            </p>
          </div>
          <p className="text-[0.8rem] font-SFlight text-[#6e6e73] tracking-wider">
            India
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
