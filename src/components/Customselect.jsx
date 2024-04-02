import React, { useState } from "react";
import "./Customselect.css";

/**
 * Custom Select component.
 * @param {Object} props - Component props.
 * @param {string[]} props.options - The list of options to display in the dropdown.
 * @param {boolean} props.isMulti - Flag indicating whether multiple options can be selected.
 * @param {string|string[]} props.value - The currently selected option(s).
 * @param {(value: string|string[]) => void} props.onChange - Function to handle changes in selected option(s).
 * @param {string} [props.placeholder="Select an option"] - Placeholder text for the input field.
 * @returns {JSX.Element} Customselect component.
 */
const Customselect = ({ options, isMulti, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : value || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  /**
   * Toggle the dropdown visibility.
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handle keydown events for keyboard navigation.
   * @param {React.KeyboardEvent} e - The keyboard event object.
   */
  const handleKeyDown = (e) => {
    const filteredOptionsCount = filteredOptions.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedOptionIndex((prevIndex) =>
        prevIndex === filteredOptionsCount - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedOptionIndex((prevIndex) =>
        prevIndex === 0 ? filteredOptionsCount - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedOptionIndex !== -1) {
        handleOptionSelect(filteredOptions[focusedOptionIndex]);
      }
    }
  };

  /**
   * Handle selection of an option.
   * @param {string} option - The selected option.
   */
  const handleOptionSelect = (option) => {
    if (isMulti) {
      setSelectedOptions((prevOptions) => {
        if (prevOptions.includes(option)) {
          return prevOptions.filter((opt) => opt !== option);
        }
        return [...prevOptions, option];
      });
    } else {
      setSelectedOptions(option);
      setIsOpen(false);
      setSearchTerm("");
    }
    onChange(isMulti ? selectedOptions : option);
  };

  /**
   * Handle removal of a selected option in multi-select mode.
   * @param {string} option - The option to remove.
   */
  const handleRemoveOption = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((opt) => opt !== option)
    );
    onChange(selectedOptions.filter((opt) => opt !== option));
  };

  /**
   * Handle input field value changes for search/filtering.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event object.
   */
  const handleSearch = (e) => {
    const { value } = e.target;

    if (value.length === 1) {
      setIsOpen(true);
    }

    setSearchTerm(value);

    if (!isOpen) {
      return;
    }
  };

  /**
   * Filter options based on search term.
   */
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-select">
      <div className="input-container" onClick={toggleDropdown}>
        <input
          type="text"
          value={searchTerm} 
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Select an option"} 
        />
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="dropdown">
          <ul className="option-list">
            {filteredOptions.map((option, index) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={focusedOptionIndex === index ? "focused" : ""}
                onMouseOver={() => setFocusedOptionIndex(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isMulti && (
        <div className="selected-options">
          {selectedOptions.map((option) => (
            <span key={option} className="selected-option">
              {option}
              <button onClick={() => handleRemoveOption(option)}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customselect;
