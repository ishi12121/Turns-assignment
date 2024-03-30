import React, { useState } from 'react';
import OptionsList from './OptionsList';
import './Select.css';

const Select = ({ options, isMulti, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : value || '');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
    }
    onChange(isMulti ? selectedOptions : option);
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions((prevOptions) => prevOptions.filter((opt) => opt !== option));
    onChange(selectedOptions.filter((opt) => opt !== option));
  };

  return (
    <div className="select-container">
      <div className="select-value" onClick={toggleDropdown}>
        {isMulti ? (
          selectedOptions.map((option) => (
            <span key={option} className="selected-option">
              {option}
              <span className="remove-option" onClick={() => handleRemoveOption(option)}>
                &times;
              </span>
            </span>
          ))
        ) : (
          <span>{selectedOptions || 'Select an option'}</span>
        )}
        <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <OptionsList
          options={options}
          selectedOptions={selectedOptions}
          onOptionSelect={handleOptionSelect}
        />
      )}
    </div>
  );
};

export default Select;