export interface Country {
  name: string;
  code: string;
}

export interface State {
  name: string;
  state_code: string;
}

export interface City {
  name: string;
}

class LocationService {
  private baseUrl = 'https://restcountries.com/v3.1';

  async getCountries(): Promise<Country[]> {
    try {
      const response = await fetch(`${this.baseUrl}/all`);
      const data = await response.json();
      return data.map((country: any) => ({
        name: country.translations.spa?.common || country.name.common,
        code: country.cca2
      })).sort((a: Country, b: Country) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }

  async getStates(countryCode: string): Promise<State[]> {
    // Por ahora retornamos un array vacío, más adelante podemos implementar
    // una API específica para estados/provincias
    return [];
  }

  async getCities(countryCode: string, stateCode: string): Promise<City[]> {
    // Por ahora retornamos un array vacío, más adelante podemos implementar
    // una API específica para ciudades
    return [];
  }
}

export const locationService = new LocationService(); 