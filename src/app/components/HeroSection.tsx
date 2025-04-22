"use client";

import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  onStartPlanning: () => void;
}

export default function HeroSection({ onStartPlanning }: HeroSectionProps) {
  return (
    <section className={styles.heroSection}>
      <picture>
        <source media="(max-width: 768px)" srcSet="/hero-bg-mobile.png" />
        <source media="(min-width: 769px)" srcSet="/hero-bg.png" />
        <img
          src="/hero-bg.png"
          alt="World travel backdrop"
          className={styles.heroImage}
        />
      </picture>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <button onClick={onStartPlanning} className={styles.heroButton}>
          Start Planning
        </button>
      </div>
    </section>
  );
}
