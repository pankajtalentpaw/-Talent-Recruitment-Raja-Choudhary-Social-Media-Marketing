"use client";

import { AdminPanel } from "@/components/admin/AdminPanel";
import { ContactSection } from "@/components/contact/ContactSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PerksSection } from "@/components/perks/PerksSection";
import { PrivateGate } from "@/components/private-gate/PrivateGate";
import { RegistrationSection } from "@/components/registration/RegistrationSection";
import { RolesSection } from "@/components/roles/RolesSection";
import { useApplicants } from "@/hooks/useApplicants";
import { useSettings } from "@/hooks/useSettings";
import { useState } from "react";

export default function Home() {
  const [adminOpen, setAdminOpen] = useState(false);
  const {
    applicants,
    addApplicant,
    deleteApplicant,
    clearApplicants,
    refreshApplicants,
  } = useApplicants();
  const { settings, updateSettings } = useSettings();

  return (
    <>
      <PrivateGate />
      <div className="h-[3px] bg-topbar-gradient" />
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />
      <main>
        <HeroSection />
        <RolesSection />
        <PerksSection />
        <RegistrationSection onSubmitApplicant={addApplicant} />
        <ContactSection />
      </main>
      <Footer />
      <AdminPanel
        open={adminOpen}
        settings={settings}
        applicants={applicants}
        onClose={() => setAdminOpen(false)}
        onUpdateSettings={updateSettings}
        onDeleteApplicant={deleteApplicant}
        onClearApplicants={clearApplicants}
        onRefreshApplicants={refreshApplicants}
      />
    </>
  );
}
