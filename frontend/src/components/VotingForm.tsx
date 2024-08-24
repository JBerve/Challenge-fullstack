"use client";

import React, { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { submitVote } from '../services/countryService'; // Import the service

type FormState = {
    name: string;
    email: string;
    country: string;
};

type ErrorsState = {
    name?: string;
    email?: string;
    country?: string;
};

export default function VotingForm({ onVoteSubmitted }: { onVoteSubmitted: () => void }) {
    const [form, setForm] = useState<FormState>({ name: '', email: '', country: '' });
    const [errors, setErrors] = useState<ErrorsState>({});
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const validate = () => {
        const newErrors: ErrorsState = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
        if (!form.country) newErrors.country = 'Country selection is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await submitVote(form.name, form.email, form.country);
            setSubmissionSuccess(true);
            onVoteSubmitted(); // Call the function to refresh the table
        } catch (error: any) {
            setSubmissionError(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div>
            {submissionSuccess ? (
                <div className="flex items-center gap-2 p-4 bg-white shadow-md rounded-xl font-inter">
                    <AiOutlineCheckCircle className="text-green-500 text-2xl" />
                    <p className="text-lg font-semibold text-gray-700">Your vote was successfully submitted</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-xl font-inter">
                    <p className="text-lg font-bold text-gray-700">Vote your Favourite Country</p>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col flex-1 relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="flex flex-col flex-1 relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex flex-col flex-1 relative">
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={form.country}
                                onChange={(e) => setForm({ ...form, country: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.country && (
                                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`h-full py-2 px-6 rounded-xl transition duration-200 whitespace-nowrap bg-gray-200 text-gray-500 hover:bg-black hover:text-white`}
                            style={{ height: "calc(100% - 2px)" }}
                        >
                            Submit Vote
                        </button>
                    </div>
                    {submissionError && <p className="text-red-500 text-sm mt-4">{submissionError}</p>}
                </form>
            )}
        </div>
    );
}