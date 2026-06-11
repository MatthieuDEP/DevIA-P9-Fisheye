"use client";

import Image from "next/image";
import { useRef } from "react";
import Modal from "./Modal";
import styles from "./ContactModal.module.css";

export default function ContactModal({
  photographerName,
  onClose,
  returnFocusRef,
}) {
  const firstNameRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log(Object.fromEntries(formData));
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      ariaLabelledBy="contact-title"
      initialFocusRef={firstNameRef}
      returnFocusRef={returnFocusRef}
      overlayClassName={styles.overlay}
      dialogClassName={styles.modal}
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
          <Image
            src="/CloseVector.png"
            alt=""
            width={42}
            height={42}
          />
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
    </Modal>
  );
}
