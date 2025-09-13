import React from 'react';

export default function Skills() {
  const skills = [
    'RxJs',
    'NgRx',
    'NgXs',
    'Nx',
    'Jest',
    "Jasmine + Karma",
    'Chai + Mocha',
    'Docker',
    'Kubernetes',
    'Cypress',
    'Protractor'
  ];

  return <div className='w-full'>
    <h2 className="mb-4 text-2xl font-bold border-b-1 uppercase">
      Skills
    </h2>

    <ul className='grid gap-1 sm:grid-cols-2 sm:gap-4'>
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}  
    </ul>
  </div>;
}
