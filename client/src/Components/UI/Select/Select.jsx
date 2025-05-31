import React, { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import ChevronDown from '../../../images/chevron-right (1).svg';

const Select = ({ 
  label, 
  options = [], 
  placeholder = "Select an option", 
  control, 
  name, 
  rules 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <div
              className="w-full p-[5px] rounded border-1 border-[#474C59] bg-transparent text-base font-mediumcursor-pointer flex justify-between items-center text-gray-400"
              onClick={toggleDropdown}
            >
              {value ? <span className='text-black'>

                {options.find(option => option.value === value)?.label }
              </span>
                : placeholder}
              <img 
                src={ChevronDown} 
                alt="dropdown toggle" 
                className={`transition-transform duration-300 ${isOpen ? 'rotate-270' : 'rotate-90'}`} 
              />
            </div>
            {isOpen && Array.isArray(options) && options.length > 0 && (
              <div className="absolute z-10 w-full mt-0 bg-white border border-[#474C59] rounded-md shadow shadow-black p-2">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="px-2 py-1 cursor-pointer hover:bg-[#e3e3e3] rounded-lg duration-200"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
            {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default Select;