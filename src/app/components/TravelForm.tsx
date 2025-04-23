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

interface Itinerary {
  title: string;
  days: {
    day: number;
    activities: string[];
  }[];
}

interface ServerMessage {
  type: "thought" | "final";
  content?: string;
  payload?: Itinerary;
}

export default function TravelForm() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingThoughts, setStreamingThoughts] = useState<string[]>([]);
  const [finalItinerary, setFinalItinerary] = useState<Itinerary | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData: FormData = {
      destination: (form.querySelector("#destination") as HTMLInputElement)
        .value,
      dates: (form.querySelector("#dates") as HTMLInputElement).value,
      currency: (form.querySelector("#currency") as HTMLSelectElement).value,
      budget: Number((form.querySelector("#budget") as HTMLInputElement).value),
      interests: selectedInterests,
    };

    try {
      setIsLoading(true);
      setStreamingThoughts([]);
      setShowResult(false);

      const queryParams = new URLSearchParams({
        destination: formData.destination,
        dates: formData.dates,
        currency: formData.currency,
        budget: formData.budget.toString(),
      });

      formData.interests.forEach((i) => queryParams.append("interests", i));

      const eventSource = new EventSource(
        `http://localhost:8000/stream-plan?${queryParams.toString()}`
      );

      eventSource.onmessage = (event) => {
        console.log("Raw SSE:", event.data);
        try {
          const message = JSON.parse(event.data);
          console.log("Received message:", message); // <— Add this
          
          switch (message.type) {
            case "thought":
              if (message.content) {
                let content = message.content;
            
                // If content is an object dumped as a string, make it readable
                if (typeof content === "string" && content.includes("{") && content.includes("input")) {
                  try {
                    // Try to parse it if it's a stringified object
                    const parsed = JSON.parse(content);
                    if (parsed?.input) content = parsed.input;
                  } catch {
                    // If parsing fails, just use the raw string
                  }
                }
            
                console.log("Streaming thought:", content);
                setStreamingThoughts((prev) => [...prev, content]);
                setIsLoading(false);
              }
              break;
      
            case "final":
              if (message.payload) {
                console.log("Received finalItinerary payload:", message.payload);
                setFinalItinerary(message.payload);
              }
              break;
      
            case "done":
              setShowResult(true);
              eventSource.close();
              break;
      
            default:
              console.warn("Unhandled message type:", message);
              break;
          }
        } catch (err) {
          console.warn("Invalid SSE message:", event.data);
        }
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
    setFinalItinerary(null);
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  /* if (isLoading && streamingThoughts.length === 0) {
    return <LoadingState />;
  } */

  if (true) {

  if (streamingThoughts.length > 0 || showResult) {
    return (
      <section className={styles.form} style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "#2563eb" }}>
            🧠 Agent Thoughts
          </h2>
          <ul style={{ lineHeight: "1.6", paddingLeft: 0 }}>
            {streamingThoughts.map((thought, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "0.5rem",
                  listStyle: "none",
                  background: "#f8fafc",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  color: "#0f172a", // dark text for better contrast
                }}
              >
                <span style={{ marginRight: "0.5rem" }}>💡</span>
                {thought}
              </li>
            ))}
          </ul>
        </div>

        {finalItinerary && showResult && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "#f0f9ff",
              borderRadius: "0.75rem",
              border: "1px solid #bae6fd",
            }}
          >
            <h2 style={{ color: "#0369a1", marginBottom: "1.5rem" }}>
              {finalItinerary.title}
            </h2>
            {finalItinerary.days.map((day) => (
              <div key={day.day} style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ color: "#0284c7", marginBottom: "0.75rem" }}>
                  Day {day.day}
                </h3>
                <ul style={{ paddingLeft: "1.25rem" }}>
                  {day.activities.map((activity, idx) => (
                    <li
                      key={idx}
                      style={{ marginBottom: "0.5rem", color: "#334155" }}
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {showResult && (
          <button
            onClick={handlePlanAnother}
            className={styles.button}
            style={{ marginTop: "2rem" }}
          >
            Plan Another Trip
          </button>
        )}
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
}
