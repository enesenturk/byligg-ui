import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Matches } from "@/components/landing/matches";
import { LeaderboardPreview } from "@/components/landing/leaderboard-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Matches />
        <LeaderboardPreview />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
