"use client";

import { ContactSection } from "@/components/contact/ContactSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PerksSection } from "@/components/perks/PerksSection";
import { PrivateGate } from "@/components/private-gate/PrivateGate";
import { RegistrationSection } from "@/components/registration/RegistrationSection";
import { RolesSection } from "@/components/roles/RolesSection";
import { useApplicants } from "@/hooks/useApplicants";

export default function Home() {
  const { addApplicant } = useApplicants();

  return (
    <>
      <PrivateGate />
      <div className="h-[3px] bg-topbar-gradient" />
      <Navbar />
      <main>
        <HeroSection />
        <RolesSection />
        <PerksSection />
        <RegistrationSection onSubmitApplicant={addApplicant} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
