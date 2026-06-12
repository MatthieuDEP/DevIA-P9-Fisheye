"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SortMenu.module.css";

const sortOptions = [
  { value: "popularity", label: "Popularité" },
  { value: "date", label: "Date" },
  { value: "title", label: "Titre" },
];

export default function SortMenu({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const selectedIndex = sortOptions.findIndex(
    (option) => option.value === value,
  );
  const selectedOption = sortOptions[selectedIndex];

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus();
    }
  }, [isOpen]);

  const openMenu = (index = selectedIndex) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const selectOption = (index) => {
    onChange(sortOptions[index].value);
    closeMenu();
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu(
        selectedIndex === sortOptions.length - 1
          ? 0
          : selectedIndex + 1,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(
        selectedIndex === 0
          ? sortOptions.length - 1
          : selectedIndex - 1,
      );
    }
  };

  const handleListKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % sortOptions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) =>
          (index - 1 + sortOptions.length) % sortOptions.length,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(sortOptions.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(activeIndex);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    } else if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <span id="sort-label" className={styles.label}>
        Trier par
      </span>

      <div className={styles.menu}>
        <button
          ref={triggerRef}
          className={styles.trigger}
          type="button"
          aria-labelledby="sort-label sort-trigger-value"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="sort-options"
          onClick={() =>
            isOpen ? closeMenu() : openMenu(selectedIndex)
          }
          onKeyDown={handleTriggerKeyDown}
        >
          <span id="sort-trigger-value">{selectedOption.label}</span>
          <span className={styles.arrow} aria-hidden="true" />
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            id="sort-options"
            className={styles.options}
            role="listbox"
            aria-labelledby="sort-label"
            aria-activedescendant={`sort-option-${activeIndex}`}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
          >
            {sortOptions.map((option, index) => (
              <li
                id={`sort-option-${index}`}
                key={option.value}
                className={styles.option}
                role="option"
                aria-selected={option.value === value}
                data-active={index === activeIndex}
                onClick={() => selectOption(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
