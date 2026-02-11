import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import TopicsSection from "@/components/TopicsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TopicsSection />
      <TimelineSection />
      <FooterSection />
    </main>
  );
};

export default Index;
