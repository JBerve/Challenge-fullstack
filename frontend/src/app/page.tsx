"use client";

import VotingForm from "../components/VotingForm";
import CountryDisplayTable from "../components/CountryDisplayTable";
import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0); // Use a number as the key

    const handleVoteSubmitted = () => {
        setRefreshKey(prevKey => prevKey + 1); // Increment the key to force re-render
    };

    return (
        <div className="p-8 min-h-screen bg-gray-100">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <header className="flex items-center mb-8">
                <img src="/logo.png" alt="Loopstudio Logo" width={160} height={40} className="mr-4"/>
                <div className="h-10 border-l border-gray-300"></div>
                <h1 className="ml-4 text-sm font-semibold text-gray-700" style={{fontFamily: 'Montserrat, sans-serif'}}>
                    Frontend Developer Challenge
                </h1>
            </header>
            <div className="max-w-7xl mx-auto">
                <VotingForm onVoteSubmitted={handleVoteSubmitted} />
                <CountryDisplayTable key={refreshKey} />
            </div>
        </div>
    );
}