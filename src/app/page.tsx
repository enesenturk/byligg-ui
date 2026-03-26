"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Matches } from "@/components/landing/matches";
import { LeaderboardPreview } from "@/components/landing/leaderboard-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/landing/footer";
import { RegisterModal } from "@/components/auth/register-modal";

export default function LandingPage() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />
      <main>
        <Hero onOpenRegister={() => setRegisterOpen(true)} />
        <Features />
        <Matches />
        <LeaderboardPreview />
        <HowItWorks />
      </main>
      <Footer />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => setRegisterOpen(false)}
      />
    </>
  );
}
