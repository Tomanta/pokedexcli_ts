import { Cache } from './pokecache.js';

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval: number) {
        this.cache = new Cache(interval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        const cache_entry = this.cache.get<ShallowLocations>(url);
        if (cache_entry) {
            return cache_entry;
        }
        
        try {
            const response = await fetch(url);
        
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const locations: ShallowLocations = await response.json();
            this.cache.add(url, locations);
            return locations;
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }

    }

    async fetchLocation(locationName: string): Promise<Location> {
        let url = `${PokeAPI.baseURL}/location-area/${locationName}/`
        
        const cache_entry = this.cache.get<Location>(locationName);
        if (cache_entry) {
            return cache_entry;
        }


        try {
            const response = await fetch(url);
        
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const location: Location = await response.json();
            this.cache.add(locationName, location);
            return location;
        } catch (e) {
            throw new Error(`Error fetching location '${locationName}': ${(e as Error).message}`);
        }
    }
}

type APILink = {
    name: string;
    url: string;
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string | null;
    results: APILink[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: APILink;
        version_details: {
            rate: number;
            version: APILink;
        }[];
    }[];

    game_index: number;
    id: number;
    location: APILink;
    name: string;
    names: {
        language: APILink;
        name: string;
    }[];
    pokemon_encounters: PokemonEncounter[];
};

type PokemonEncounter = {
    pokemon: APILink;
    version_details: {
        encounter_details: {
            chance: number;
            condition_values: any[];
            max_level: number;
            method: APILink;
            min_level: number;
        }[];
        max_number: number;
        version: APILink;
    }[];
}