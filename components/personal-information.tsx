import React from 'react';
import LinkedInIcon from './icons/linkedin';
import PersonIcon from './icons/person';
import MapMarkerIcon from './icons/map-marker';
import PhoneIcon from './icons/phone';
import AtIcon from './icons/at';

export default function PersonalInformation() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Personal Information
      </h2>

      <ul className="space-y-3">
        <li className="flex items-center space-x-3">
          <PersonIcon className="w-6 h-6" variant="dark" />
          <span>Serhii Kholodnyi</span>
        </li>

        <li className="flex items-center space-x-3">
          <MapMarkerIcon className="w-6 h-6" variant="dark" />
          <span>Tallinn, Estonia</span>
        </li>

        <li className="flex items-center space-x-3">
          <PhoneIcon className="w-6 h-6" variant="dark" />
          <a href="tel:+37251900494">+372 5190 0494</a>
        </li>

        <li className="flex items-center space-x-3">
          <AtIcon className="w-6 h-6" variant="dark" />
          <a href="mailto:serg.holodny@gmail.com">serg.holodny@gmail.com</a>
        </li>

        <li className="flex items-center space-x-3">
          <LinkedInIcon className="dark" />
          <span>linkedin.com/in/serhii-kholodnyi</span>
        </li>
      </ul>
    </div>
  );
}
