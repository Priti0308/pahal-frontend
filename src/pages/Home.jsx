import AboutCIMDRSection from "../components/Home/AboutCIMDRSection";
import CurrentEventGallery from "../components/Home/CurrentEventGallery";
import PahalHeroSection from "../components/Home/PahalHeroSection"; 
import PastEventsWinnersSection from "../components/Home/PastEventsWinnersSection";
import PrizesRecognitionSection from "../components/Home/PrizesRecognitionSection";
import UpcomingEventsSection from "../components/Home/UpcomingEventsSection";
import WhoShouldJoinSection from "../components/Home/WhoShouldJoinSection";

function Home() {
  return (
    <>
      <PahalHeroSection />
      <AboutCIMDRSection />
      <WhoShouldJoinSection />
      <UpcomingEventsSection />
      <CurrentEventGallery />
      <PrizesRecognitionSection />
      <PastEventsWinnersSection />
    </>

  );
}

export default Home;
