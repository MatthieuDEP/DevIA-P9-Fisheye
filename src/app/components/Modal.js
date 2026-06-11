"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const focusableElementsSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "a[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function Modal({
  children,
  onClose,
  ariaLabel,
  ariaLabelledBy,
  initialFocusRef,
  returnFocusRef,
  overlayClassName = "",
  dialogClassName = "",
  closeOnBackdrop = true,
  onKeyDown,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const returnFocusElement = returnFocusRef?.current;

    document.body.classList.add(styles.bodyLocked);
    const focusFrame = requestAnimationFrame(() => {
      initialFocusRef?.current?.focus();
    });

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.classList.remove(styles.bodyLocked);
      requestAnimationFrame(() => returnFocusElement?.focus());
    };
  }, [initialFocusRef, returnFocusRef]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      onKeyDown?.(event);

      if (event.defaultPrevented || event.key !== "Tab") {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll(
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
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onKeyDown]);

  const handleBackdropClick = (event) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={`${styles.overlay} ${overlayClassName}`}
      onClick={handleBackdropClick}
    >
      <section
        ref={dialogRef}
        className={dialogClassName}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </section>
    </div>,
    document.body,
  );
}
