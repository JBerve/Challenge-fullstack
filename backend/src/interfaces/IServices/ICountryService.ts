import { ICountry } from '../../models/country';

export interface ICountryService {
    getCountryDetails(countryName: string): Promise<ICountry>;
    getTopFavoriteCountries(): Promise<ICountry[]>;
}