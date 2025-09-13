import React from 'react';

export default function Education() {
  const educationData = [
    {
      period: '2006 - 2011',
      university: 'Zaporizhzhya National Technical University',
      degree: "Master's degree",
      field: 'INFORMATIONAL COMMUNICATION NETWORKS'
    },
    {
      period: '2008-2011',
      university: 'Zaporizhzhya National Technical University',
      degree: "Bachelor's degree",
      field: 'TECHNICAL TRANSLATION (ENGLISH)'
    }
  ];

  return (
    <div className='w-full'>
      <h2 className="mb-4 text-2xl font-bold border-b-1 uppercase">
        Education
      </h2>

      <div className="mt-6">
        {educationData.map((education, index) => (
          <div key={index} className="relative flex">
            {/* Timeline line and dot - matching work-experience style */}
            <div className="flex flex-col items-center mr-4">
              {/* Timeline dot */}
              <div className="w-1 h-1 rounded-full bg-slate-600 shadow-sm"></div>
              {/* Vertical line */}
              <div className="w-0.5 bg-slate-300 flex-grow mt-2 mb-2 min-h-[120px]"></div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              {/* Small screen layout */}
              <div className="lg:hidden">
                {/* Date badge */}
                <div className="inline-block bg-slate-600 text-white px-3 py-1 text-sm mb-3">
                  {education.period}
                </div>
                
                {/* University name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {education.university}
                </h3>
                
                {/* University logo */}
                <div className="w-16 h-16 mb-3">
                  <img src="university-logo.png" alt="University logo" className="w-full h-full object-contain" />
                </div>
                
                {/* Degree */}
                <p className="text-gray-600 mb-2">{education.degree}</p>
                
                {/* Field of study */}
                <p className="text-gray-800 font-medium uppercase text-sm">
                  {education.field}
                </p>
              </div>

              {/* Large screen layout */}
              <div className="hidden lg:flex lg:items-center lg:justify-between">
                {/* Date badge */}
                <div className="flex-shrink-0 bg-slate-600 text-white px-4 py-2 text-sm mr-6">
                  {education.period}
                </div>
                
                {/* University name */}
                <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-4">
                  {education.university}
                </h3>
                
                {/* University logo */}
                <div className="w-12 h-12 flex-shrink-0 mr-4">
                  <img src="university-logo.png" alt="University logo" className="w-full h-full object-contain" />
                </div>
                
                {/* Right side content */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-gray-600 mb-1">{education.degree}</p>
                  <p className="text-gray-800 font-medium uppercase text-sm">
                    {education.field}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
