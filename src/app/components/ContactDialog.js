"use client";

import { useRef, useState } from "react";
import ContactModal from "./ContactModal";

export default function ContactDialog({
  photographerName,
  buttonClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button
        ref={triggerRef}
        className={buttonClassName}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Contactez-moi
      </button>

      {isOpen && (
        <ContactModal
          photographerName={photographerName}
          onClose={closeModal}
        />
      )}
    </>
  );
}
