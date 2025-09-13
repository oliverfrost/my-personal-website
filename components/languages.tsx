import React from 'react';

export default function Languages() {
  return <div className="w-full">
    <h2 className="mb-4 text-2xl font-bold border-b-1">
      Languages
    </h2>

    <ul className="space-y-3">
      <li className="flex justify-between space-x-3">
        <span>English</span>
        <span>C1</span>
      </li>
      <li className="flex justify-between space-x-3">
        <span>Ukrainian</span>
        <span>C2</span>
      </li>
      <li className="flex justify-between space-x-3">
        <span>Russian</span>
        <span>C2</span>
      </li>
      <li className="flex justify-between space-x-3">
        <span>Spanish</span>
        <span>B1</span>
      </li>
      <li className="flex justify-between space-x-3">
        <span>German</span>
        <span>A1</span>
      </li>
    </ul>
  </div>
}

