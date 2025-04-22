"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import HeroSection from "./components/HeroSection";

// Create a client-only form component
const TravelForm = dynamic(() => import("./components/TravelForm"), {
  ssr: false, // Disable server-side rendering for this component
});

const interests = ["History", "Food", "Nature", "Art", "Relaxation"];
const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.pageWrapper}>
      <HeroSection onStartPlanning={scrollToForm} />

      <section ref={formRef} className={styles.formSection}>
        <div className={styles.formOverlay} />
        <div className={styles.formContent}>
          <h1 className={styles.title}>AetherAgent: Travel AI</h1>
          <p className={styles.subtitle}>Smart trips. Tailored by AI.</p>
          <TravelForm />
        </div>
      </section>
    </div>
  );
}
