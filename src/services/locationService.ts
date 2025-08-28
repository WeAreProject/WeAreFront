export interface Country {
  name: string;
  code: string;
}

export interface State {
  name: string;
  code: string;
}

export interface City {
  name: string;
}

class LocationService {
  private countries: Country[] = [
    { name: 'México', code: 'MX' },
    // ... otros países si los hay
  ];

  private states: { [key: string]: State[] } = {
    MX: [
      { name: 'Puebla', code: 'PUE' },
      // ... otros estados
    ]
  };

  private cities: { [key: string]: { [key: string]: City[] } } = {
    MX: {
      PUE: [
        { name: 'Puebla' },
        // ... otras ciudades
      ]
    }
  };

  async getCountries(): Promise<Country[]> {
    return Promise.resolve(this.countries);
  }

  async getStates(): Promise<State[]> {
    return Promise.resolve(this.states['MX']); // Por ahora solo retornamos estados de México
  }

  async getCities(): Promise<City[]> {
    return Promise.resolve(this.cities['MX']['PUE']); // Por ahora solo retornamos ciudades de Puebla
  }
}

export const locationService = new LocationService(); 