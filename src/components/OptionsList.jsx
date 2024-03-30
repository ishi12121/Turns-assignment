import React from 'react';
import './OptionsList.css';

const OptionsList = ({ options, selectedOptions, onOptionSelect }) => {
  const handleOptionClick = (option) => {
    onOptionSelect(option);
  };

  return (
    <ul className="options-list">
      {options.map((option) => (
        <li
          key={option}
          className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default OptionsList;