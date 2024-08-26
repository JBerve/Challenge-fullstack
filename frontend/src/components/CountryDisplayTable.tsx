"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { fetchTopCountries } from '../services/countryService';
import { Country } from '../models/Country';

export default function CountryDisplayTable() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const topCountries = await fetchTopCountries();
                setCountries(topCountries);
            } catch (error) {
                setError('Failed to fetch countries.');
            }
        };

        loadCountries();
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.subregion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Top 10 Most Voted Countries</h2>
            <div className="relative mb-4 w-full sm:max-w-md">
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search Country, Capital City, Region or Subregion"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto shadow-md rounded-xl bg-white">
                <table className="min-w-full">
                    <thead>
                    <tr className="text-left">
                        <th className="px-4 py-2 text-gray-700 text-center">Country</th>
                        <th className="px-4 py-2 text-gray-700 text-center">Capital City</th>
                        <th className="px-4 py-2 text-gray-700 text-center">Region</th>
                        <th className="px-4 py-2 text-gray-700 text-center">Sub Region</th>
                        <th className="px-4 py-2 text-gray-700 text-center">Votes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-center text-sm sm:text-base">{country.name}</td>
                                <td className="px-4 py-2 text-center text-sm sm:text-base">{country.capital}</td>
                                <td className="px-4 py-2 text-center text-sm sm:text-base">{country.region}</td>
                                <td className="px-4 py-2 text-center text-sm sm:text-base">{country.subregion}</td>
                                <td className="px-4 py-2 text-center text-sm sm:text-base">{country.votes}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-4 py-2 text-center text-sm sm:text-base" colSpan={5}>{error || 'No countries found'}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}