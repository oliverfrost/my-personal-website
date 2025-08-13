import React from 'react';

export default function PersonalInformation() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Personal Information
      </h2>

      <ul className="space-y-3">
        <li className="flex items-center space-x-3">
          <img src="/person-filled.svg" width="16" height="16" alt="" />
          <span>Serhii Kholodnyi</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="/map-marker.svg" width="16" height="16" alt="" />
          <span>Tallinn, Estonia</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="/phone.svg" width="16" height="16" alt="" />
          <span>+372 5190 0494</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="/at.svg" width="16" height="16" alt="" />
          <span>serg.holodny@gmail.com</span>
        </li>

        <li className="flex items-center space-x-3">
          <img src="/linkedin.svg" width="16" height="16" alt="" />
          <span>linkedin.com/in/serhii-kholodnyi</span>
        </li>
      </ul>
    </div>
  );
}
