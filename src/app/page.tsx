import Accessories from "@/components/accessories";
import AppleDifference from "@/components/appledifference";
import AppleExperience from "@/components/appleExperience";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HelpSection from "@/components/help";
import Hero from "@/components/hero/hero";
import TheLatest from "@/components/latest";
import Navbar from "@/components/navbar/navbar";
import Personalisation from "@/components/personalization";
import QuickLinks from "@/components/quickLinks";
import SpecialStore from "@/components/specialstore";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Hero />
      <TheLatest />
      <Accessories />
      <Personalisation />
      <AppleDifference />
      <HelpSection />
      <AppleExperience />
      <SpecialStore />
      <QuickLinks />
      <Footer />
    </>
  );
}
