import axios from 'axios';
import { Country } from '../models/Country';

const API_URL = 'http://localhost:3000/api';

export const fetchTopCountries = async (): Promise<Country[]> => {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
};

export const submitVote = async (name: string, email: string, country: string): Promise<void> => {
    await axios.post(`${API_URL}/users`, { name, email, country });
};