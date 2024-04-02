import React, { useState } from 'react';
import './Customselect.css';

const Customselect = ({ options, isMulti, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : value || '');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom-select">
      <div className="input-container" onClick={toggleDropdown}>
        <input
          type="text"
          value={isMulti ? selectedOptions.join(', ') : selectedOptions}
          onChange={handleSearch}
          placeholder="Select an option"
        />
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="dropdown">
          <ul className="option-list">
            {filteredOptions.map((option) => (
              <li key={option} onClick={() => handleOptionSelect(option)}>
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