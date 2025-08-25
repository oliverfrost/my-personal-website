import React from 'react';
import WorkExperienceItem from './work-experience-item';

const workExperience = [
  {
    dateRange: "November 2021 - Present",
    company: "TurnKey Labs",
    role: "Senior Frontend Developer / Team Lead",
    responsibilities: [
      "Leading a frontend team on multiple client-facing projects",
      "Designing scalable frontend architecture",
      "Performing code reviews, mentoring developers",
      "Coordinating closely with designers and product managers"
    ]
  },
  {
    dateRange: "September 2018 - November 2021",
    company: "DataArt",
    role: "Senior Frontend Developer / Team Lead",
    responsibilities: [
      "Frontend architecture design and implementation",
      "Leading cross-functional frontend teams",
      "Integrating with RESTful APIs and backend services",
      "Code quality control, test automation"
    ]
  },
  {
    dateRange: "September 2017 - September 2018",
    company: "Previous Company",
    role: "Middle Frontend Developer / Team Lead",
    responsibilities: [
      "Built and maintained client side components",
      "Managed small team and sprint planning",
      "Participated in product decision-making and UI innovation"
    ]
  }
];

export default function WorkExperience() {
  return <div className="mx-auto max-w-md">
    <h2 className="mb-4 text-2xl font-bold border-b-1">
      Work Experience
    </h2>

    <div className="mt-6">
      {workExperience.map((experience, index) => (
        <WorkExperienceItem
          key={index}
          dateRange={experience.dateRange}
          company={experience.company}
          role={experience.role}
          responsibilities={experience.responsibilities}
          isLast={index === workExperience.length - 1}
        />
      ))}
    </div>
  </div>;
}
