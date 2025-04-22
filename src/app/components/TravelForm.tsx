"use client";

import { FormEvent, useState } from "react";
import styles from "../page.module.css";
import ItineraryResult from "./ItineraryResult";

const interests = ["History", "Food", "Nature", "Art", "Relaxation"];
const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

interface FormData {
  destination: string;
  dates: string;
  currency: string;
  budget: number;
  interests: string[];
}

interface ItineraryResponse {
  itinerary: { day: string; plan: string }[];
  totalCost: string;
  agentThoughts: string[];
}

export default function TravelForm() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [itineraryData, setItineraryData] = useState<ItineraryResponse | null>(null);

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
      setItineraryData(null);

      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      setItineraryData(data);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handlePlanAnother = () => {
    setShowResult(false);
    setSelectedInterests([]);
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  if (showResult && itineraryData) {
    return (
      <ItineraryResult
        itinerary={itineraryData.itinerary}
        totalCost={itineraryData.totalCost}
        agentThoughts={itineraryData.agentThoughts}
        onPlanAnother={handlePlanAnother}
      />
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
