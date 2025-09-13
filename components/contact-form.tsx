'use client';

import React, { useRef } from 'react';

export default function ContactForm() {
    const isOpenForNewOpportunities = true;
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data = {
                fullName: formData.get('fullName') as string,
                email: formData.get('email') as string,
                message: formData.get('message') as string
            };

            // Handle form submission here
            console.log('Form submitted:', data);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                {/* Status Badge */}
                {isOpenForNewOpportunities && (
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center px-6 py-2 bg-white border-2 border-green-600 rounded-full">
                            <span className="text-green-600 mr-2">✓</span>
                            <span className="text-green-600 font-medium">Open for new opportunities</span>
                        </div>
                    </div>
                )}

                {/* Title */}
                <h2 className="text-3xl font-light text-gray-600 text-center mb-8">
                    Contact Me
                </h2>

                {/* Form */}
                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-gray-600 font-medium mb-2">
                            Full Name:
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-gray-600 font-medium mb-2">
                            Message:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-slate-600 text-white h-10 rounded-2xl font-medium text-lg hover:bg-slate-700 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}