import React from 'react';

export default function PersonalInformation() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Personal Information
      </h2>
      <ul className="space-y-3">
        <li className="flex items-center space-x-3">
          <img src="" alt="" />
          <span className="text-gray-700">Full Name: John Doe</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="" alt="" />
          <span className="text-gray-700">Email: john.doe@example.com</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="" alt="" />
          <span className="text-gray-700">Phone: +1 (555) 123-4567</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="" alt="" />
          <span className="text-gray-700">Location: San Francisco, CA</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="" alt="" />
          <span className="text-gray-700">Birthday: January 15, 1990</span>
        </li>
      </ul>
    </div>
  );
}
