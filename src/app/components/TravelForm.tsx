"use client";

import { FormEvent, useState } from "react";
import styles from "../page.module.css";
import LoadingState from "./LoadingState";

const interests = ["History", "Food", "Nature", "Art", "Relaxation"];
const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

interface FormData {
  destination: string;
  dates: string;
  currency: string;
  budget: number;
  interests: string[];
}

export default function TravelForm() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingThoughts, setStreamingThoughts] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData: FormData = {
      destination: (form.querySelector("#destination") as HTMLInputElement).value,
      dates: (form.querySelector("#dates") as HTMLInputElement).value,
      currency: (form.querySelector("#currency") as HTMLSelectElement).value,
      budget: Number((form.querySelector("#budget") as HTMLInputElement).value),
      interests: selectedInterests,
    };

    try {
      setIsLoading(true);
      setStreamingThoughts([]);
      setShowResult(false);

      const eventSource = new EventSource("/api/stream-plan");

      eventSource.onmessage = (event) => {
        const data = event.data;

        if (data === "[DONE]") {
          eventSource.close();
          setIsLoading(false);
          setShowResult(true);
          return;
        }

        setStreamingThoughts((prev) => [...prev, data]);
      };

      eventSource.onerror = (err) => {
        console.error("SSE error:", err);
        eventSource.close();
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const handlePlanAnother = () => {
    setShowResult(false);
    setSelectedInterests([]);
    setStreamingThoughts([]);
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (showResult) {
    return (
      <section style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>🧠 Agent Thoughts</h2>
        <ul style={{ lineHeight: "1.6", paddingLeft: 0 }}>
          {streamingThoughts.map((thought, index) => (
            <li key={index} style={{ marginBottom: "0.5rem", listStyle: "none" }}>
              <span style={{ marginRight: "0.5rem" }}>💡</span>
              {thought}
            </li>
          ))}
        </ul>
        <button onClick={handlePlanAnother} style={{ marginTop: "2rem" }}>
          Plan Another Trip
        </button>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="destination" className={styles.label}>
          Destination
        </label>
        <input
          type="text"
          id="destination"
          className={styles.input}
          placeholder="Where would you like to go?"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dates" className={styles.label}>
          Dates
        </label>
        <input
          type="text"
          id="dates"
          className={styles.input}
          placeholder="e.g. 10–14 May"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="budget" className={styles.label}>
          Budget
        </label>
        <div className={styles.currencyGroup}>
          <select id="currency" className={styles.currencySelect} required>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="budget"
            className={styles.input}
            placeholder="Enter amount"
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Travel Interests (Optional)</label>
        <div className={styles.interestsGroup}>
          {interests.map((interest) => (
            <div key={interest}>
              <input
                type="checkbox"
                id={interest}
                value={interest}
                className={styles.checkbox}
                checked={selectedInterests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
              />
              <label htmlFor={interest} className={styles.checkboxLabel}>
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Plan my trip
      </button>
    </form>
  );
}
