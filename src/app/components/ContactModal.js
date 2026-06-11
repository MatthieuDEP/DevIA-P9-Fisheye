"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./ContactModal.module.css";

const focusableElementsSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "a[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function ContactModal({ photographerName, onClose }) {
  const modalRef = useRef(null);
  const firstNameRef = useRef(null);

  useEffect(() => {
    document.body.classList.add(styles.bodyLocked);
    firstNameRef.current?.focus();

    return () => {
      document.body.classList.remove(styles.bodyLocked);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = modalRef.current?.querySelectorAll(
      focusableElementsSelector,
    );

    if (!focusableElements?.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log(Object.fromEntries(formData));
    onClose();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <header className={styles.header}>
          <h2 id="contact-title">
            Contactez-moi
            <span>{photographerName}</span>
          </h2>

          <button
            className={styles.closeButton}
            type="button"
            aria-label="Fermer le formulaire de contact"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="contact-first-name">Prénom</label>
            <input
              ref={firstNameRef}
              id="contact-first-name"
              name="firstName"
              type="text"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-last-name">Nom</label>
            <input
              id="contact-last-name"
              name="lastName"
              type="text"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message">Votre message</label>
            <textarea
              id="contact-message"
              name="message"
              required
            />
          </div>

          <button className={styles.submitButton} type="submit">
            Envoyer
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}
