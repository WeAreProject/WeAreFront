class LocationService {
    constructor() {
        this.countries = [
            { name: 'México', code: 'MX' },
            // ... otros países si los hay
        ];
        this.states = {
            MX: [
                { name: 'Puebla', code: 'PUE' },
                // ... otros estados
            ]
        };
        this.cities = {
            MX: {
                PUE: [
                    { name: 'Puebla' },
                    // ... otras ciudades
                ]
            }
        };
    }
    async getCountries() {
        return Promise.resolve(this.countries);
    }
    async getStates() {
        return Promise.resolve(this.states['MX']); // Por ahora solo retornamos estados de México
    }
    async getCities() {
        return Promise.resolve(this.cities['MX']['PUE']); // Por ahora solo retornamos ciudades de Puebla
    }
}
export const locationService = new LocationService();
