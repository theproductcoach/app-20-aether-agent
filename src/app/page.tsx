"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

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
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <button onClick={scrollToForm} className={styles.heroButton}>
            Start Planning
          </button>
        </div>
      </section>

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
