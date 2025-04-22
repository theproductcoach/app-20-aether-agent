"use client";

import { FormEvent } from "react";
import styles from "../page.module.css";

const interests = ["History", "Food", "Nature", "Art", "Relaxation"];
const currencies = ["USD", "EUR", "GBP", "JPY", "AUD"];

export default function TravelForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

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
