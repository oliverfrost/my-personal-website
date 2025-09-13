'use client';

import React, { useState } from 'react';

interface SimpleSwitcherProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function SimpleSwitcher({ 
  checked = false, 
  onChange
}: SimpleSwitcherProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
      />
      <div
        className={`
          relative w-14 h-8 rounded-full transition-colors duration-200 ease-in-out
          ${isChecked 
            ? 'bg-white' 
            : 'bg-slate-600'
          }
        `}
      >
        <div
          className={`
            absolute top-1 w-6 h-6 bg-white rounded-full shadow-md
            transition-transform duration-200 ease-in-out
            ${isChecked ? 'translate-x-1' : 'translate-x-6' }
          `}
        />
      </div>
    </label>
  );
}
