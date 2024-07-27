import { useState } from 'react';

const ComboBox = ({ options = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOptions = options.filter(
    (option) => typeof option.NAME === 'string' && option.NAME?.toLowerCase().includes(query?.toLowerCase())
  );

  const handleSelect = (option) => {
    setQuery(option.NAME);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-1">
      <input
        type="text"
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              data-id = {option._id}
              key={index}
              className="cursor-pointer px-3 py-2 hover:bg-indigo-500 hover:text-white"
              onClick={() => handleSelect(option)}
            >
              {option.NAME}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
