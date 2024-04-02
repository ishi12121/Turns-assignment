import React, { useState } from "react";
import "./Customselect.css";

const Customselect = ({ options, isMulti, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    isMulti ? [] : value || ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const handleRemoveOption = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((opt) => opt !== option)
    );
    onChange(selectedOptions.filter((opt) => opt !== option));
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value.length === 1) {
      // Open dropdown when typing the first letter
      setIsOpen(true);
    }

    setSearchTerm(value);

    if (!isOpen) {
      // Do not update selected options until an option is selected
      return;
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-select">
      <div className="input-container" onClick={toggleDropdown}>
        <input
          type="text"
          value={searchTerm} // Display searchTerm in the input field
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Select an option"} // Use provided placeholder or default
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
