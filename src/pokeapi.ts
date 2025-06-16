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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        let url = `${PokeAPI.baseURL}/pokemon/${pokemonName}/`
        
        const cache_entry = this.cache.get<Pokemon>(pokemonName);
        if (cache_entry) {
            return cache_entry;
        }


        try {
            const response = await fetch(url);
        
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const pokemon: Pokemon = await response.json();
            this.cache.add(pokemonName, pokemon);
            return pokemon;
        } catch (e) {
            throw new Error(`Error fetching pokemon '${pokemonName}': ${(e as Error).message}`);
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

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: APILink;
    }[];
    forms: APILink[];
    game_indices: {
        game_number: number;
        version: APILink;
    }[];
    held_items: {
        item: APILink;
        version_details: {
            rarity: number;
            version: APILink;
        }[];
    }[];
    location_area_encounters: string;
    moves: {
        move: APILink;
        version_group_details: {
            level_learned_at: number;
            version_group: APILink;
            move_learn_method: APILink;
            order: number;
        }[];
    }[];
    species: APILink;
    sprites: {
        back_default: string;
        back_female?: any;
        back_shiny: string;
        back_shiny_female?: any;
        front_default: string;
        front_female?: any;
        other: {
            dream_world: {
                front_default: string;
                front_female?: any;
            };
            home: {
                front_default: string;
                front_female?: any;
                front_shiny: string;
                front_shiny_female?: any;
            };
            "official-artwork": {
                front_default: string;
                front_shiny: string;
            };
            showdown: {
                back_default: string
                back_female?: any
                back_shiny: string
                back_shiny_female?: any
                front_default: string
                front_female?: any
                front_shiny: string
                front_shiny_female?: any                
            }
        };
        versions: any;

    };
    cries: any;
    stats: {
        base_stat: number;
        effort: number;
        stat: APILink;
    }[];
    types: {
        slot: number;
        type: APILink;
    }[];
    past_types: any[];
    past_abilities: any[];
}