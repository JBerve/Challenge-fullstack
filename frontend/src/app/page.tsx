"use client";

import VotingForm from "../components/VotingForm";
import CountryDisplayTable from "../components/CountryDisplayTable";
import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleVoteSubmitted = () => {
        setRefreshKey(prevKey => prevKey + 1); 
    };

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gray-100">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <header className="flex flex-col sm:flex-row items-center mb-8">
                <img src="/logo.png" alt="Loopstudio Logo" className="w-32 sm:w-40 mb-4 sm:mb-0 sm:mr-4"/>
                <div className="h-6 sm:h-10 border-l border-gray-300"></div>
                <h1 className="mt-4 sm:mt-0 ml-0 sm:ml-4 text-center sm:text-left text-base sm:text-lg font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Frontend Developer Challenge
                </h1>
            </header>
            <div className="max-w-full lg:max-w-7xl mx-auto">
                <VotingForm onVoteSubmitted={handleVoteSubmitted} />
                <CountryDisplayTable key={refreshKey} />
            </div>
        </div>
    );
}